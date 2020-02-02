import React from 'react';
import { Link } from 'react-router-dom';
import styles from './../../styles/adminDash.module.css';

function AdminPage() {
    return (
        <>
            <h1 className={styles.centered}>Admin Dashboard</h1>
            <div className={styles.centered}> 
                <Link className={styles.link} to='/admin/users'>User Approval</Link>
            </div>
            <div className={styles.centered}>
                <Link className={styles.link} to='./admin/files'>Manage Files</Link>
            </div>
        </>
    )
}

export default AdminPage;