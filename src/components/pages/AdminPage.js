import React from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
    return (
        <>
            <h1>AdminPage</h1>
            <Link to='/admin/users'>User Approval</Link>
        </>
    )
}

export default AdminPage;