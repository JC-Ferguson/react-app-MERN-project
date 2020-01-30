import React, { Component } from 'react';
import RegisterForm from '../forms/RegisterForm';
import Blurb from '../views/Blurb';
import './../../styles/registerLogin.css';

class RegisterPage extends Component {
    render() {
        return (
            <>
                <div className='flex'>
                    <Blurb />
                    <RegisterForm  {...this.props}/>
                </div>
            </>
        )
    }
}

export default RegisterPage;