import React, { Component } from 'react';
import customAxios from './../../api/customAxios';
import { connect } from 'react-redux';
import styles from './../../styles/adminUsers.module.css';
import toggleStyles from './../../styles/toggleSwitch.module.css';

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
            });
            users = JSON.parse(users);

            // sort users so pending users are above non-pending, then time, then alphabetical
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

            this.setState({ users: users });
        } catch(error) {
            console.log(error);
        }
    }
    
    // method to toggle approval on users
    // closure used so that a the id of each document that will be updated can be saved
    onCheckboxToggle = (id) => {
        return async () => {
            const { token } = this.props;
            await customAxios.post('/toggleApproval', { id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            this.getUsers();
        }
    }
    
    render() {
        const { users } = this.state;

        return (
            <>
                <h1 className={styles.centered}>User Approval</h1>
                <div>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.th}>
                                <th className={styles.left}>Email</th>
                                <th></th>
                                <th>Approval</th>
                                <th>Date created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item) => {
                                return (
                                    <tr className='tr-hover-highlight' key={item._id}>
                                        <td>{item.email}</td>
                                        <td className={`${styles.warning} ${styles.centered}`}>{item.pending ? 'Pending': null}</td>
                                        <td className={styles.centered}>
                                            <label className={toggleStyles.switch}>
                                                <input type='checkbox' checked={item.approved} onChange={this.onCheckboxToggle(item._id)} className={toggleStyles.input} />
                                                <span className={`${toggleStyles.slider} ${toggleStyles.round}`}></span>
                                            </label>
                                        </td>
                                        <td className={styles.centered}>{item.dateCreated.substr(0,10)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps)(AdminUsersPage);