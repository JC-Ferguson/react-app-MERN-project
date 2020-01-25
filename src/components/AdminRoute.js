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
        admin: false
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
                this.setState({ admin: true });
                console.log(this.state);
            };

        } catch(error) {
            console.log(error);
        };
    };

    componentDidMount() {
        this.getAdminStatus();
    };
    
    render() {
        const { admin } = this.state;
        const { component: Component, ...rest } = this.props;

        return <Route {...rest} render={props => {
            console.log(`Admin in render: ${admin}`);
            if (admin) {
                return <Component {...props} />
            }
            return <Redirect to='/login' />
        }} />;
    };
};

// connect to the redux store
export default connect(mapStateToProps)(AdminRoute);