import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// use redux to add token into props
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.currentUser.user
    };
};

class AdminRoute extends Component {
    render() {
        const { user, component: Component, ...rest } = this.props;

        // if user is admin, return a route, else redirect to login
        return (
            <Route {...rest}
                render={props => {
                    return (user && user.admin) ? <Component {...props} /> : <Redirect to='/login' />
                }}
            />
        )
    };
};

export default connect(mapStateToProps)(AdminRoute);