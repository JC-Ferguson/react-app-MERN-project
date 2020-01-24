import React, { Component } from 'react';
import RegisterForm from '../forms/RegisterForm';
import Blurb from '../views/Blurb';

class RegisterPage extends Component {
    render() {
        return (
            <>
                <h1>Register</h1>
                <RegisterForm  {...this.props}/>
                <Blurb />
                <a href='/login'>Already have an account?</a>
            </>
        )
    }
}

export default RegisterPage;