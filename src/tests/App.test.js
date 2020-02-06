import React from 'react';
import Blurb from './../components/views/Blurb';
import LoginForm from './../components/forms/LoginForm';
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from './../components/App';

console.log(LoginForm.WrappedComponent);

it('Test file runs', () => {
    expect(true).toBe(true);
});

it('Calling blurb returns expected html', () => {
    const props = { heading: 'Heading', blurb: ' My blurb' };
    expect(Blurb(props)).toStrictEqual(<div className="blurbContainer"><h1 className="h1">Heading</h1><p className="p"> My blurb</p></div>);
});

describe('Login user test', () => {
    it('user can log in', () => {
        const details = { email: 'mark@test.com', password: 'qwerty' };
        LoginForm.WrappedComponent.onFormSubmit();
    });
});