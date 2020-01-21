import React, { Component } from 'react';
import customAxios from './../../api/customAxios';

class RegisterForm extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    // axios used to post form contents to /newuser route in backend
    onFormSubmit = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = this.state;

        await customAxios.post('/newuser', {
            email,
            password,
            confirmPassword
        });
        // after creating a user, redirect somewhere?
    }

    // method to update state whenever entries are made in the input fields
    // closure used to allow a single method to handle multiple input fields
    // via different arguments
    onInputChange = (fieldName) => {
        return (event) => {
            this.setState({ [fieldName]: event.target.value });
        }
    }
    
    render() {
        const { email, password, confirmPassword } = this.state;

        return (
            <>
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <label>Email</label>
                        <input type='text' name='email' onChange={this.onInputChange('email')} value={email} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' name='password' onChange={this.onInputChange('password')} value={password}  />
                    </div>
                    <div>
                        <label>Confirm</label>
                        <input type='password' name='confirmPassword' onChange={this.onInputChange('confirmPassword')} value={confirmPassword}  />
                        {password !== confirmPassword ? <p>Warning: Passwords do not match</p> : null}
                    </div>
                    
                    <input type='submit' value='Register' />
                </form>
            </>
        )
    }
}

export default RegisterForm;