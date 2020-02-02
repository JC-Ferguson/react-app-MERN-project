import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { setAuthToken, setSearchResult } from './../actions';
import axios from "axios";
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
import TopBar from "./views/TopBar";
import './../styles/App.css';

class App extends Component {
    solutions = [
        "Adobe Experience Cloud (AEC)", 
        "Adobe Analytics, Dynamic Tag Management (AA)", 
        "Adobe Target (AT)", 
        "Adobe Audience Member (AAM)", 
        "Adobe Campaign (AC)",
        "Adobe Advertising Cloud, Paid Media (AAC/ADCLOUD)",
        "Other"
    ]
    teams = [
        "AT Owners", "Project Managers", "AT Implementation Team", "Content Team", "AEC Owners", "Stakeholders",
        "AdCloud Users", "Optimisation Team", "SEM/Media Team", "Performance Marketing Team", "Advertisers",
        "AEC Technical Team", "Project Teams", "Agile Teams", "Internal Optimisation", "Strategy Team",
        "Tech Team", "Developers", "AA Analysts", "AA Owners", "AEC Owners and Managers",
        "AAM Users", "AT Users", "AT Analysts", "AT Performance/Reporting Team", "AA Developers", "Social Media Team", 
        "AT Recommendations Users", "AT Recommendations Implementation Team", "AA Users", "Tag Specialists", "Teams That Will Engage with Design Team",
        "Teams That Will Engage with PDD", "Tech Implementation Team", "Display/Media Team", "AEM Owners", "Anyone New to Programmatic",
        "AT Implementation/QA Team", "Leads and Stakeholders", "Product Team", "NA", "Solution Specialists", "AAM Planners",
        "AAM Tech Team", "Data, Team", "Tag Managers", "Analytics Managers", "Implementation Specialists", "Various"
    ]

    searchCall = async ()=>{
        const { queryBenefits, querySolution } = this.state;
        await axios.post("http://localhost:3001/category", {
              querySolution,
              queryBenefits
            })
            .then(response =>{
                this.props.setSearchResult(response.data);
                return response.data;
            })
            .then(data=>{
                sessionStorage.setItem("learningContent", JSON.stringify(data));
                console.log(data)
                // this.history.push("/category");
            })
    }

    onCategorySelect = (e)=>{
        const query = e.target.innerHTML
        if(this.teams.includes(query)){
            this.setState({ queryBenefits: query, querySolution: "" }, this.searchCall)
        } else {
            const shortenedQuery = query.match(/(?<=\().*(?=\))/);
            this.setState( { querySolution: shortenedQuery, queryBenefits: "" }, this.searchCall )
        }
    }

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
                    < Route exact path = "/home" render={ (props)=>{
                        return <HomePage {...props} onCategorySelect={this.onCategorySelect} />
                    }} />
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
                    < Route exact path = '/admin/files' component = {AdminFilesPage} />
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, { setAuthToken, setSearchResult })(App);