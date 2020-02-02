import React, { Component } from 'react';
import customAxios from '../../api/customAxios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthToken } from '../../actions';
import styles from './../../styles/form.module.css';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        invalidDetails: false
    };
    
    // method to control elements
    onInputChange = (fieldName) => {
        // function returned, i.e. a closure, so 1 function can handle both the 'email' and 'password' fields
        return (event) => {
            // state set using the fieldName, which is a string passed in as an argument
            // which corresponds to the key in state
            this.setState({ [fieldName]: event.target.value });
        }
    }

    // form contents sent to backend
    onFormSubmit = async (event) => {
        // preventDefault() stops page reloading
        event.preventDefault();
        // email and password variables pulled off state
        const { email, password } = this.state;

        // http POST request made using axios to express app, sending email and password
        try {
            const response = await customAxios.post('/login', {
                email,
                password
            });
            // save the JWT into global state using redux
            this.props.setAuthToken(response.data);
            this.props.history.push('/home');
        } catch(err) {
            console.log(err)
            this.setState({ invalidDetails: true });
        }
        
    }

    render() {
        const { email, password, invalidDetails } = this.state;

        return (
            <div>
                <h1 className={`${styles.h1} ${styles.centered}`}>Login</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div className={styles.divEmail}>
                        <label className={`${styles.label} ${styles.labelBlock}`}>Email</label>
                        <input className={`${styles.input} ${styles.inputWide}`} type='text' name='email' onChange={this.onInputChange('email')} value={email} />
                    </div>
                    <div>
                        <label className={`${styles.label} ${styles.labelBlock}`}>Password</label>
                        <input className={`${styles.input} ${styles.inputWide}`} type='password' name='password' onChange={this.onInputChange('password')} value={password} />
                    </div>
                    <div className={styles.height}>
                        {invalidDetails ? <p className={styles.warning}>Invalid username or password</p> : null}
                    </div>
                    <input className={styles.inputSubmit} type='submit' value='Login' />
                </form>
                <Link to='/register'>Register an account</Link>
            </div>
        )
    }
}

export default connect(null, { setAuthToken })(LoginForm);