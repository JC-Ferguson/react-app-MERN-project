import React from 'react';
import styles from './../../styles/blurb.module.css';

function Blurb() {
    return (
        <div className={styles.blurbContainer}>
            <h1 className={styles.h1}>AccordantHelp</h1>
            <p className={styles.p}>The AccordantHelp library is a collection of documents used to train accordant staff and clients on the suite of Adobe products offered at Accordant.</p>
        </div>
    )
}

export default Blurb;