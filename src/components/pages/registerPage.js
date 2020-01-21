import React, { Component } from 'react';
import RegisterForm from './../forms/registerForm';
import Blurb from './../views/blurb';

class RegisterPage extends Component {
    render() {
        return (
            <>
                <h1>Register</h1>
                <RegisterForm />
                <Blurb />
            </>
        )
    }
}

export default RegisterPage;