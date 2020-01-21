import React, { Component } from 'react';
import customAxios from './../../api/customAxios';

class registerForm extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    // method to update state whenever entries are made in the input fields
    // closure used to allow a single method to handle multiple input fields
    // via different arguments
    updateInput = (fieldName) => {
        return (event) => {
            this.setState({ [fieldName]: event.target.value });
        }
    }
    
    // axios used to post form contents to /newuser route in backend
    postToRegister = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = this.state;

        await customAxios.post('/newuser', {
            email,
            password,
            confirmPassword
        });
        // after creating a user, redirect somewhere?
    }
    
    render() {
        const { email, password, confirmPassword } = this.state;

        return (
            <>
                <h3>Register form</h3>
                <form onSubmit={this.postToRegister}>
                    <div>
                        <label>Email</label>
                        <input type='text' name='email' onChange={this.updateInput('email')} value={email} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' name='password' onChange={this.updateInput('password')} value={password}  />
                    </div>
                    <div>
                        <label>Confirm</label>
                        <input type='password' name='confirmPassword' onChange={this.updateInput('confirmPassword')} value={confirmPassword}  />
                        {password !== confirmPassword ? <p>Warning: Passwords do not match</p> : null}
                    </div>
                    
                    <input type='submit' value='Register' />
                </form>
            </>
        )
    }
}

export default registerForm;