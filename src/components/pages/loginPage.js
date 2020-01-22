import React, { Component } from 'react';
import LoginForm from './../forms/loginForm';
import Blurb from './../views/blurb';

class LoginPage extends Component {
    render() {
        return (
            <>
                <h1>Login</h1>
                <LoginForm {...this.props} />
                <Blurb />
                <a href='/register'>Register an account</a>
            </>
        )
    }
}

export default LoginPage;