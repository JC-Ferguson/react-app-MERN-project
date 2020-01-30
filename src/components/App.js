import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthToken } from './../actions';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivatePage from './pages/PrivatePage';
import PrivateRoute from './PrivateRoute';
import HomePage from './pages/HomePage';
import CategoryPage from "./pages/CategoryPage";
import ShowContentPage from "./pages/ShowContentPage";
import AdminPage from './pages/AdminPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminFilesPage from './pages/AdminFilesPage';
import AdminRoute from './AdminRoute';

class App extends Component {
    render(){

        return(
            <BrowserRouter>
                <div>
                    < Route exact path = "/register" render = {(props) => {
                        return <RegisterPage {...props} />
                    }} />
                    < Route exact path = "/login" render = {(props) => {
                        return <LoginPage {...props} />
                    }} />
                    < PrivateRoute exact path="/private" component={PrivatePage} />
                    < Route exact path = "/home" component = {HomePage} />
                    < Route exact path = "/category" render={(props)=>{
                                return < CategoryPage {...props} />
                            }} 
                    />
                    < Route 
                            exact path = "/lesson/:id" render={(props)=>{
                                return < ShowContentPage {...props} />
                            }} 
                    />
                    < AdminRoute exact path = '/admin/' component = {AdminPage} />
                    < AdminRoute exact path = '/admin/users' component = {AdminUsersPage} />
                    < AdminRoute exact path = '/admin/files' component = {AdminFilesPage} />
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, { setAuthToken })(App);