import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from 'semantic-ui-react';
import axios from "axios";
import { connect } from "react-redux";
import {setSearchResult} from "./../../actions";
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

        state = { querySolution: "", queryBenefits: ""}

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
                    this.props.history.push("/category");
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
        return (
            <section className={styles.topBar}>
                <div className={styles.logo}>
                    <Link to="/home"><img src={Logo} alt="Accordant Logo" /></Link>
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
                                                // <Link to="/category">
                                                    <Dropdown.Item key={solution} onClick = {this.onCategorySelect} >{solution}</Dropdown.Item>
                                                // </Link>
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
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>Searchbar</div>
                </Menu>
                <div className={styles.logout}>
                    Logout
                </div>
            </section>

        )
    }
}

export default connect(null, {setSearchResult})(TopBar);