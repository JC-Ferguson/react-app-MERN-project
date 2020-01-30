import React from 'react';

function Blurb() {
    const { heading, blurb } = this.props;
    return (
        <>
            <h3>{heading}</h3>
            <p>{blurb}</p>
        </>
    )
}

export default Blurb;