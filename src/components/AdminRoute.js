import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import customAxios from './../api/customAxios';

// use redux to add token into props
const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

class AdminRoute extends Component {
    state = {
        admin: false,
        loaded: false
    };
    
    getAdminStatus = async () => {
        const { token } = this.props;
        
        try {
            const response = await customAxios.get('/confirmAdmin', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.status === 200) {
                this.setState({ admin: true, loaded: true });
            } else {
                this.setState({ loaded: true });
            };
        } catch(error) {
            console.log(error);
            this.setState({ loaded: true });
        };
    };

    componentDidMount() {
        this.getAdminStatus();
    };
    
    render() {
        const { admin, loaded } = this.state;
        const { component: Component, ...rest } = this.props;

        if (!loaded) return null;

        return (
            <Route {...rest}
                render={props => {
                    return admin ? <Component {...props} /> : <Redirect to='/login' />
                }}
            />
        )
    };
};

// connect to the redux store
export default connect(mapStateToProps)(AdminRoute);