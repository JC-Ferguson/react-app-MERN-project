import React, { Component } from 'react';
import AddFilesForm from './../forms/AddFilesForm';

class AdminFilesPage extends Component {
    render() {
        return (
            <>
                <h1>Admin Content Page</h1>
                <AddFilesForm />
            </>
        );
    }
}

export default AdminFilesPage;