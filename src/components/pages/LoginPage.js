import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import Blurb from '../views/Blurb';
import styles from './../../styles/registerLogin.module.css';

class LoginPage extends Component {
    render() {
        return (
            <div className={styles.flex}>
                <Blurb heading ="AccordantHelp" blurb = "The AccordantHelp library is a collection of documents used to train accordant staff and clients on the suite of Adobe products offered at Accordant." />
                <LoginForm {...this.props} />
            </div>
        )
    }
}

export default LoginPage;