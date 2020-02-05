import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from 'semantic-ui-react';
import customAxios from '../../api/customAxios';
import { connect } from "react-redux";
import { setSearchResult, mostRecentSearch, setAuthToken, setUser } from "./../../actions";
import Logo from "./../../images/accordant-logo.png";
import styles from "./../../styles/TopBar.module.css"

class TopBar extends Component {
    solutions = [
        "Adobe Experience Cloud (AEC)", 
        "Adobe Analytics, Dynamic Tag Management (AA)", 
        "Adobe Target (AT)", 
        "Adobe Audience Member (AAM)", 
        "Adobe Campaign (AC)",
        "Adobe Advertising Cloud, Paid Media (AAC/ADCLOUD)",
        "Other"
    ];
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
    ];
    prerequisites=[
        'has AA',
        'has AT',
        'has AAC',
        'has AdCloud',
        'has AEM',
        'has AT Premium',
        'has DTM',
        'no AT',
        'None Required'
    ];

    state = { querySolution: "", queryBenefits: "", queryPrereqs: "" };

    // axios request to express server to query MongoDB for files
    searchCall = () => {
        const { queryBenefits, querySolution, queryPrereqs} = this.state;
        customAxios.post("/category", {
            querySolution,
            queryBenefits,
            queryPrereqs
        })
        .then(response => {
            this.props.setSearchResult(response.data);
            return response.data;
        })
        .then(data => {
            this.props.history.push("/category");
        })
    }

    // saves selection from dropdown menu into state, then runs searchCall method
    onCategorySelect = (e) => {
        const query = e.target.innerHTML;
        this.props.mostRecentSearch(query);

        if(this.teams.includes(query)){
            this.setState({ queryBenefits: query, querySolution: "", queryPrereq: "" }, this.searchCall)
        } else if(this.solutions.includes(query)) {
            const shortenedQuery = query.match(/(?<=\().*(?=\))/);
            this.setState( { querySolution: shortenedQuery, queryBenefits: "", queryPrereq: "" }, this.searchCall )
        } else if (this.prerequisites.includes(query)) {
            this.setState( { querySolution: "", queryBenefits: "", queryPrereqs: query }, this.searchCall )
        }
    }

    onLogout = () => {
        this.props.setAuthToken();
        this.props.setUser();
    }

    render(){
        const { token, user } = this.props; 
        const { admin } = this.state;

        const searchOptions = [...this.solutions, ...this.teams, ...this.prerequisites];

        const options=searchOptions.map(search=>{
            return {key: search, text: search, value: search}
        })
        
        return (
            <section className={styles.topBar}>
                <div className={styles.logo}>
                    <Link to="/"><img src={Logo} alt="Accordant Logo" /></Link>
                </div>
                <Menu className={styles.searchMenu}>
                    <Dropdown text='Categories' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Header>Categories</Dropdown.Header>
                            <Dropdown.Item ref={this.searchInput}>
                                <Dropdown text="Solutions">
                                    <Dropdown.Menu>
                                        <Dropdown.Header >Solutions</Dropdown.Header>
                                        {this.solutions.map(solution =>{
                                            return(
                                                <Dropdown.Item key={solution} onClick = {this.onCategorySelect} >{solution}</Dropdown.Item>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Dropdown text='Teams'>
                                    <Dropdown.Menu>
                                    <Dropdown.Header>Teams</Dropdown.Header>
                                    {this.teams.sort().map(team =>{
                                        return(<Dropdown.Item key={team} onClick = {this.onCategorySelect} >{team}</Dropdown.Item>)
                                    })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            < Dropdown.Item>
                                    <Dropdown text = "Prerequisites">
                                        <Dropdown.Menu >
                                            <Dropdown.Header>Prerequisites</Dropdown.Header>
                                            {this.prerequisites.sort().map(element=>{
                                                return <Dropdown.Item key={element} onClick ={this.onCategorySelect} >{element}</Dropdown.Item>
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown placeholder='Advanced Search' clearable fluid multiple search selection options={options} ref={this.advSearch} onChange={this.testFunction}/>
                    <button type="submit" onClick ={this.testFunction} >Search</button>
                </Menu>
                <div className={styles.logout}>
                    {user && user.admin ? <Link to='/admin'>Admin</Link> : null}
                    {token ? <Link to='/login' onClick={this.onLogout}>Logout</Link> : <Link to='/login' >Login</Link>}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        token: state.auth.token,
        user: state.currentUser.user
    }
}

export default connect(mapStateToProps, { setSearchResult, mostRecentSearch, setAuthToken, setUser })(TopBar);