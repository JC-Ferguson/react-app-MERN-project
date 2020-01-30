import React, { Component } from 'react';
import customAxios from '../../api/customAxios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthToken } from '../../actions';
import './../../styles/form.css';

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
            <div>
                <h1 className='centered'>Register</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div className='div-email'>
                        <label className='label-block'>Email</label>
                        <input className='input-wide' type='text' name='email' onChange={this.onInputChange('email')} value={email} />
                    </div>
                    <div>
                        <label>Password</label>
                        <label>Confirm</label>
                    </div>
                    <div>
                        <input type='password' name='password' onChange={this.onInputChange('password')} value={password} />
                        <input type='password' name='confirmPassword' onChange={this.onInputChange('confirmPassword')} value={confirmPassword}  />
                        {password !== confirmPassword ? <p className='warning'>Warning: Passwords do not match</p> : null}
                    </div>
                    <input className='input-submit' type='submit' value='Sign up' />
                </form>
                <Link to='/login'>Already have an account?</Link>
            </div>
        )
    }
}

export default connect(null, { setAuthToken })(RegisterForm);