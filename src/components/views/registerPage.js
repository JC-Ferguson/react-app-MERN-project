import React, { Component } from 'react';
import RegisterForm from './../forms/registerForm';

class RegisterPage extends Component {
    state = {};

    render() {
        return (
            <>
                <h1>Register</h1>
                <RegisterForm />
            </>
        )
    }
}

export default RegisterPage;