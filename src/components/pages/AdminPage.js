import React from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
    return (
        <>
            <h1>Admin Dashboard</h1>
            <Link to='/admin/users'>User Approval</Link>
            <Link to='./admin/files'>Manage Files</Link>
        </>
    )
}

export default AdminPage;