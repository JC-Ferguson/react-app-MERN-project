import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthToken } from './../actions';
import ShowContentPage from "./views/show-content";
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import PrivatePage from './pages/privatePage';
import PrivateRoute from './PrivateRoute';
import HomePage from './pages/homePage';

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
                    {/*< Route exact path = "/category" component = {} /> */}
                    < Route exact path = "/lesson/:id" component = {ShowContentPage} />
                    {/* < Route exact path = "/admin/dash" component = {} />
                    < Route exact path = "/admin/user-access" component = {} />
                    < Route exact path = "/admin/content-crud" component = {} /> */}
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, { setAuthToken })(App);