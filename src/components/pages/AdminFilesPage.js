import React, { Component } from 'react';
import AddFilesForm from './../forms/AddFilesForm';
import styles from './../../styles/adminFiles.module.css';

class AdminFilesPage extends Component {
    render() {
        return (
            <>
                <h1 className={styles.centered}>File Management</h1>
                <div className={styles.flex}>
                    <AddFilesForm />
                </div>
            </>
        );
    }
}

export default AdminFilesPage;