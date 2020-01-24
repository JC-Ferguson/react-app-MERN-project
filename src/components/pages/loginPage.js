import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './../forms/loginForm';
import Blurb from './../views/blurb';

class LoginPage extends Component {
    render() {
        return (
            <>
                <h1>Login</h1>
                <LoginForm {...this.props} />
                <Blurb />
                <Link to='/register'>Register an account</Link>
            </>
        )
    }
}

export default LoginPage;