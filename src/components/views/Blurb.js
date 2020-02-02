import React from 'react';
import styles from './../../styles/blurb.module.css';

function Blurb(props) {
    const { heading, blurb, onCategorySelect } = props;
    return (
        <div className={styles.blurbContainer}>
            <h1 className={styles.h1}>{heading}</h1>
            <p className={styles.p}>{blurb}</p>
        </div>
    )
}

export default Blurb;