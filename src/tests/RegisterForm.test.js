import React from 'react';
import ReactDOM from 'react-dom';
import App from './../components/App';
import RegisterForm from './../components/forms/RegisterForm';

it('true is true', () => {
    expect(true).toBe(true);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

// it('RegisterForm onInputChange returns a function', () => {
//     expect(RegisterForm.onInputChange('email')).toBeInstanceOf(Function);
// });