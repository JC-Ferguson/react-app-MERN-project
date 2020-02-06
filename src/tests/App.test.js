import React from 'react';
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux';
import EnzymeAdapter from "enzyme-adapter-react-16";
import Blurb from './../components/views/Blurb';
import LoginForm from './../components/forms/LoginForm';
import store from './../store';

Enzyme.configure({ adapter: new EnzymeAdapter() });

it('Test file runs', () => {
    expect(true).toBe(true);
});

it('Calling blurb returns expected html', () => {
    const props = { heading: 'Heading', blurb: ' My blurb' };
    expect(Blurb(props)).toStrictEqual(<div className="blurbContainer"><h1 className="h1">Heading</h1><p className="p"> My blurb</p></div>);
});

it('renders without crashing', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <LoginForm />
        </Provider >
    )
});