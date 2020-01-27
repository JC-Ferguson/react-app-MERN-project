import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../forms/RegisterForm';
import Blurb from '../views/Blurb';

class RegisterPage extends Component {
    render() {
        return (
            <>
                <h1>Register</h1>
                <RegisterForm  {...this.props}/>
                <Blurb />
                <Link to='/login'>Already have an account?</Link>
            </>
        )
    }
}

export default RegisterPage;