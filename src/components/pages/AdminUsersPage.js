import React, { Component } from 'react';
import customAxios from './../../api/customAxios';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

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
        try{
            const { token } = this.props;
            let { data: users } = await customAxios.get('/users', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            );
            users = JSON.parse(users);
            // sort users so pending users are above non-pending
            // then users that have been waiting the longest for approval should be at the top
            // then non-pending users are sorted alphabetically by email
            users.sort((a, b) => {
                if (a.pending && b.pending) {
                    return a.dateCreated - b.dateCreated; 
                } else if (a.pending) {
                    return -1;
                } else if (b.pending) {
                    return 1;
                } else if (a.email < b.email) {
                    return -1;
                } else {
                    return 1;
                }
            });

            // save users from http request into state
            this.setState({ users: users });
        } catch(error) {
            console.log(error);
        }
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
                            <th>Date created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item.pending ? 'Pending': null}</td>
                                    <td><input type='checkbox' checked={item.approved} onChange={this.onCheckboxToggle(item._id)} /></td>
                                    <td>{item.dateCreated.substr(0,10)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}

export default connect(mapStateToProps)(AdminUsersPage);