import React from 'react';

function Blurb(props) {
    const { heading, blurb, onCategorySelect } = props;
    return (
        <>
            <h3 onClick = {onCategorySelect} >{heading}</h3>
            <p>{blurb}</p>
        </>
    )
}

export default Blurb;