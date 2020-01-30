import React, { Component } from 'react';
import customAxios from '../../api/customAxios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthToken } from '../../actions';
import './../../styles/form.css';

class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    };
    
    // method to control elements
    onInputChange = (fieldName) => {
        // function returned, i.e. a closure, so 1 function can handle both the 'email' and 'password' fields
        return (event) => {
            // state set using the fieldName, which is a string passed in as an argument
            // which corresponds to the key in state
            this.setState({ [fieldName]: event.target.value });
        }
    }

    // form contents sent to backend
    onFormSubmit = async (event) => {
        // preventDefault() stops page reloading
        event.preventDefault();
        // email and password variables pulled off state
        const { email, password } = this.state;

        // http POST request made using axios to express app, sending email and password
        try {
            const response = await customAxios.post('/login', {
                email,
                password
            });
            // save the JWT into global state using redux
            this.props.setAuthToken(response.data);
            this.props.history.push('/home');
        } catch(err) {
            console.log(err);
        }
        
    }

    render() {
        const { email, password } = this.state;

        return (
            <div>
                <h1 className='centered'>Login</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div className='div-email'>
                        <label className='label-block'>Email</label>
                        <input className='input-wide' type='text' name='email' onChange={this.onInputChange('email')} value={email} />
                    </div>
                    <div>
                        <label className='label-block'>Password</label>
                        <input className='input-wide' type='password' name='password' onChange={this.onInputChange('password')} value={password} />
                    </div>
                    <input className='input-submit' type='submit' value='Login' />
                </form>
                <Link to='/register'>Register an account</Link>
            </div>
        )
    }
}

export default connect(null, { setAuthToken })(LoginForm);