import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import Blurb from '../views/Blurb';
import { Link } from 'react-router-dom';

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