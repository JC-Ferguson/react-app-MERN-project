import React, { Component } from 'react';
import axios from 'axios';

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
    postToLogin = (event) => {
        // process.env.EXPRESS_URL
        event.preventDefault();
        console.log('post to login triggered');
    }
    
    render() {
        const { email, password, confirmPassword } = this.state;

        return (
            <>
                <h3>Register form</h3>
                <form onSubmit={this.postToLogin}>
                    <div>
                        <label>Email</label>
                        <input type='text' name='email' onChange={this.updateInput('email')} value={email} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='text' name='password' onChange={this.updateInput('password')} value={password}  />
                    </div>
                    <div>
                        <label>Confirm</label>
                        <input type='text' name='confirmPassword' onChange={this.updateInput('confirmPassword')} value={confirmPassword}  />
                    </div>
                    <input type='submit' value='Register' />
                </form>
            </>
        )
    }
}

export default registerForm;