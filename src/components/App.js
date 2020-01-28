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
import TopBar from "./views/TopBar";

class App extends Component {
    render(){

        return(
            <BrowserRouter>
                <div>
                    < Route path = "/" component={TopBar} />
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
                    {/* < Route exact path = "/admin/dash" component = {} />
                    < Route exact path = "/admin/user-access" component = {} />
                    < Route exact path = "/admin/content-crud" component = {} /> */}
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, { setAuthToken })(App);