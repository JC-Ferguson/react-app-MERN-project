import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthToken } from './../actions';
import ShowContentPage from "./views/show-content";
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import PrivatePage from './pages/privatePage';
import PrivateRoute from './PrivateRoute';


class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <div>
                    < Route exact path = "/register" component = {RegisterPage} />
                    < Route exact path = "/login" component = {LoginPage} />
                    < PrivateRoute exact path="/private" component={PrivatePage} />
                    {/*< Route exact path = "/home" component = {} />
                    < Route exact path = "/category" component = {} /> */}
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