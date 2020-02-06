import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './../components/App';
import Blurb from './../components/views/Blurb';

it('expect true to be true', () => {
    expect(true).toBe(true);
});

it('calling blurb', () => {
    const props = { heading: 'Heading', blurb: ' My blurb' };
    expect(Blurb(props)).toStrictEqual(<div className="blurbContainer"><h1 className="h1">Heading</h1><p className="p"> My blurb</p></div>);
});

describe('Login user test', () => {
    it('')
});