import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Dropdown, Menu } from 'semantic-ui-react';
import axios from "axios";

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
            "AEC Technical Team", "Project Teams", "Agile Teams", "Internal Optimisation", "Product Team", "Strategy Team",
            "Tech Team", "Developers", "AA Analysts", "AA Owners", "AEC Owners and Managers",
            "AAM Users", "AT Users", "AT Analysts", "AT Performance/Reporting Team", "AA Developers", "Social Media Team", 
            "AT Recommendations Users", "AT Recommendations Implementation Team", "AA Users", "Tag Specialists", "Teams That Will Engage with Design Team",
            "Teams That Will Engage with PDD", "Tech Implementation Team", "Display/Media Team", "AEM Owners", "Anyone New to Programmatic",
            "AT Implementation/QA Team", "Leads and Stakeholders", "Product Team", "NA", "Solution Specialists", "AAM Planners",
            "AAM Tech Team", "Data, Team", "Tag Managers", "Analytics Managers", "Implementation Specialists", "Various"
        ]

        state = { querySolution: "", queryBenefits: "", learningContent: ""}

        searchCall = async ()=>{
            const { queryBenefits, querySolution } = this.state;
            await axios.post("http://localhost:3001/category", {
                  querySolution,
                  queryBenefits
                })
                .then(response =>{
                    console.log(response.data);
                    this.setState({ learningContent: response.data });
                    this.props.history.push("/category");
                })
        }

        onCategorySelect = (e)=>{
            const query = e.target.innerHTML
            if(this.teams.includes(query)){
                console.log("benefits query")
                this.setState({ queryBenefits: query, querySolution: "" }, this.searchCall)
            } else {
                console.log("solution query")
                this.setState( { querySolution: query, queryBenefits: "" }, this.searchCall )
            }
        }


        
        
    render(){

        return (
            <>
                <div>
                    <Link to="/home">Accordant</Link>
                </div>
                <div>
                    {/* <form action = "http://localhost:3001/category" method= "GET"> */}
                        <Menu>
                            <Dropdown text='Categories' pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Header>Categories</Dropdown.Header>
                                <Dropdown.Item ref={this.searchInput}>
                                <Dropdown text="Solutions">
                                    <Dropdown.Menu>
                                    <Dropdown.Header >Solutions</Dropdown.Header>
                                    {this.solutions.map(solution =>{
                                        return(<Dropdown.Item onClick = {this.onCategorySelect} >{solution}</Dropdown.Item>)
                                    })}
                                    </Dropdown.Menu>
                                </Dropdown>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                <Dropdown text='Teams'>
                                    <Dropdown.Menu>
                                    <Dropdown.Header>Teams</Dropdown.Header>
                                    {this.teams.sort().map(team =>{
                                        return(<Dropdown.Item onClick = {this.onCategorySelect} >{team}</Dropdown.Item>)
                                    })}
                                    </Dropdown.Menu>
                                </Dropdown>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                    {/* </form> */}
                </div>
            </>
        )
    }
}

export default TopBar;