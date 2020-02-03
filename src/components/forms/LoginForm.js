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
    
    // closure used to set state based on fieldName parameter
    onInputChange = (fieldName) => {
        return (event) => {
            this.setState({ [fieldName]: event.target.value });
        }
    }

    // contents of login form sent to express server, JWT received and saved to redux if successful
    onFormSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            const response = await customAxios.post('/login', {
                email,
                password
            });
            this.props.setAuthToken(response.data);
            this.props.history.push('/');
        } catch(err) {
            console.log(err);
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