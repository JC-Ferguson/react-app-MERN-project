import React, { Component } from 'react';
import customAxios from './../../api/customAxios';

class AdminUsersPage extends Component {
    state = {
        users: []
    }

    // getUsers called to save users into state
    componentDidMount() {
        this.getUsers();
    }

    // axios get request for users
    getUsers =  async () => {
        let { data: users } = await customAxios.get('/users');
        users = JSON.parse(users);
        // save users from http request into state
        this.setState({ users: users });
    }
    
    // method to toggle approval on users
    // closure used so that a the id of each document that will be updated can be saved
    onCheckboxToggle = (id) => {
        return async () => {
            // post the id to the /toggleApproval route in the backend
            await customAxios.post('/toggleApproval', { id });
            // get a new list of users
            this.getUsers();
        }
    }
    
    render() {
        const { users } = this.state;

        return (
            <>
                <h1>User Approval</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th></th>
                            <th>Approval</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item.pending ? 'Pending': null}</td>
                                    <td><input type='checkbox' checked={item.approved} onChange={this.onCheckboxToggle(item._id)} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}

export default AdminUsersPage;