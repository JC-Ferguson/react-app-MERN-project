import React, { Component } from 'react';
import RegisterForm from '../forms/RegisterForm';
import Blurb from '../views/Blurb';
import styles from './../../styles/registerLogin.module.css';

class RegisterPage extends Component {
    render() {
        return (
            <div className={styles.flex}>
                <Blurb />
                <RegisterForm  {...this.props}/>
            </div>
        )
    }
}

export default RegisterPage;