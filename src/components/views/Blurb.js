import React from 'react';
import styles from './../../styles/blurb.module.css';

function Blurb(props) {
    const { heading, blurb } = props;
    return (
        <>
            <h1 className={styles.h1}>{heading}</h1>
            <p className={styles.p}>{blurb}</p>
        </>
    )
}

export default Blurb;