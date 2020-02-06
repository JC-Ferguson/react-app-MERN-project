import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from 'semantic-ui-react';
import customAxios from '../../api/customAxios';
import { connect } from "react-redux";
import { setSearchResult, mostRecentSearch, setAuthToken, setUser } from "./../../actions";
import Logo from "./../../images/accordant-logo.png";
import styles from "./../../styles/TopBar.module.css";
import {solutions, teams, prerequisites} from "./../../services/category_tags";

class TopBar extends Component {
    state = { querySolution: "", queryBenefits: "", queryPrereqs: "", value: [] };

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
            this.props.history.push("/category");
        })
    }

    // saves selection from dropdown menu into state, then runs searchCall method
    onCategorySelect = (e) => {
        const query = e.target.innerHTML;
        this.props.mostRecentSearch(query);

        if(teams.includes(query)){
            this.setState({ queryBenefits: query, querySolution: "", queryPrereq: "" }, this.searchCall)
        } else if(solutions.includes(query)) {
            const shortenedQuery = query.match(/(?<=\().*(?=\))/) || query;
            this.setState( { querySolution: shortenedQuery, queryBenefits: "", queryPrereq: "" }, this.searchCall )
        } else if (prerequisites.includes(query)) {
            this.setState( { querySolution: "", queryBenefits: "", queryPrereqs: query }, this.searchCall )
        }
    }

    // uses array of selected search tags and saves into separate arrays based on category
    // sends searches to Express server and sets search results in redux
    advanceSearch = ()=>{
        const { value } = this.state;
        this.props.mostRecentSearch(value);
        const solutionsArr = [];
        const teamsArr = [];
        const prereqArr = [];
        value.forEach(tag =>{
            if(solutions.includes(tag)){
                solutionsArr.push(tag);
            } else if (teams.includes(tag)){
                teamsArr.push(tag);
            } else if (prerequisites.includes(tag)) {
                prereqArr.push(tag)
            }
        })
    
        customAxios.post("/category", {
            value,
            solutionsArr,
            teamsArr,
            prereqArr
        })
        .then(response => {
            this.props.setSearchResult(response.data);
            this.setState({ value: [] })
            this.props.history.push("/category");
        })
    }

    // on logout, set auth token and user to null in redux
    onLogout = () => {
        this.props.setAuthToken();
        this.props.setUser();
    }

    // update state based on tags selected in advanced search
    handleChange = (e, { value }) => this.setState({ value });

    render(){
        const { token, user } = this.props; 
        const { value } = this.state;

        const searchOptions = [...solutions, ...teams, ...prerequisites];


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
                                        {solutions.map(solution =>{
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
                                    {teams.sort().map(team =>{
                                        return(<Dropdown.Item key={team} onClick = {this.onCategorySelect} >{team}</Dropdown.Item>)
                                    })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Item>
                            < Dropdown.Item>
                                    <Dropdown text = "Prerequisites">
                                        <Dropdown.Menu >
                                            <Dropdown.Header>Prerequisites</Dropdown.Header>
                                            {prerequisites.sort().map(element=>{
                                                return <Dropdown.Item key={element} onClick ={this.onCategorySelect} >{element}</Dropdown.Item>
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown placeholder='Advanced Search' clearable fluid multiple search selection options={options} onChange={this.handleChange} value={value} id={styles.advSearch} />
                    <button type="submit" onClick ={this.advanceSearch} >Search</button>
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