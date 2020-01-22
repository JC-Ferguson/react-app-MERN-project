import React, { Component } from 'react';
import customAxios from './../../api/customAxios';
import { connect } from 'react-redux';
import { setAuthToken } from './../../actions';

class RegisterForm extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    // axios used to post form contents to /newuser route in backend
    onFormSubmit = (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = this.state;

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

export default connect(null, { setAuthToken })(RegisterForm);