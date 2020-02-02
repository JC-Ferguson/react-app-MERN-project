import React, { Component } from 'react';
import customAxios from '../../api/customAxios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthToken } from '../../actions';
import styles from './../../styles/form.module.css';

class RegisterForm extends Component {
    state = {
        email: '',
        emailAvailable: true,
        password: '',
        confirmPassword: ''
        
    };

    // send a request to the express server to check if an email is available
    checkEmailAvailable = async (email) => {
        const { data } = await customAxios.post('/emailAvailable', { email });
        return data;
    }

    // axios used to post form contents to /newuser route in backend
    onFormSubmit = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = this.state;

        if (await this.checkEmailAvailable(email)) {
            customAxios.post('/newuser', {
                email,
                password,
                confirmPassword
            })
            // after creating a user, redirect to home page
            .then((response) => {
                this.props.setAuthToken(response.data);
                this.props.history.push('/home');
            })
            // catch block in case the axios.post throws an error
            .catch(err => console.log(err));
        } else {
            this.setState({ emailAvailable: false });
        };
    };

    // method to update state whenever entries are made in the input fields
    // closure used to allow a single method to handle multiple input fields
    // via different arguments
    onInputChange = (fieldName) => {
        return (event) => {
            this.setState({ [fieldName]: event.target.value });
        }
    }
    
    render() {
        const { email, emailAvailable, password, confirmPassword } = this.state;

        return (
            <div>
                <h1 className={`${styles.h1} ${styles.centered}`}>Register</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div className={styles.divEmail}>
                        <label className={`${styles.label} ${styles.labelBlock}`}>Email</label>
                        <input className={`${styles.input} ${styles.inputWide}`} type='text' name='email' onChange={this.onInputChange('email')} value={email} />
                        <div className={styles.height}>
                            {emailAvailable ? null : <p className={styles.warning}>That email is already registered</p>}
                        </div>
                    </div>
                    <div>
                        <label className={styles.label}>Password</label>
                        <label className={styles.label}>Confirm</label>
                    </div>
                    <div>
                        <input className={styles.input} type='password' name='password' onChange={this.onInputChange('password')} value={password} />
                        <input className={styles.input} type='password' name='confirmPassword' onChange={this.onInputChange('confirmPassword')} value={confirmPassword}  />
                        <div className={styles.height}>
                            {password !== confirmPassword ? <p className={styles.warning}>Warning: Passwords do not match</p> : null}
                        </div>
                    </div>
                    <input className={styles.inputSubmit} type='submit' value='Sign up' />
                </form>
                <Link to='/login'>Already have an account?</Link>
            </div>
        )
    }
}

export default connect(null, { setAuthToken })(RegisterForm);