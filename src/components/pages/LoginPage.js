import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import Blurb from '../views/Blurb';
import styles from './../../styles/registerLogin.module.css';

class LoginPage extends Component {
    render() {
        return (
            <div className={styles.flex}>
                <Blurb />
                <LoginForm {...this.props} />
            </div>
        )
    }
}

export default LoginPage;