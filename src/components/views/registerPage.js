import React, { Component } from 'react';
import RegisterForm from './../forms/registerForm';
import Blurb from './blurb';

class RegisterPage extends Component {
    state = {};

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