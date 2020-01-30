import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import Blurb from '../views/Blurb';

class LoginPage extends Component {
    render() {
        return (
            <div className='flex'>
                <Blurb />
                <LoginForm {...this.props} />
            </div>
        )
    }
}

export default LoginPage;