import React, { Component } from 'react';
import customAxios from './../../api/customAxios';

class AddFilesForm extends Component {
    state = {
        solutionsList: [
            "Adobe Experience Cloud (AEC)", 
            "Adobe Analytics, Dynamic Tag Management (AA)", 
            "Adobe Target (AT)", 
            "Adobe Audience Member (AAM)", 
            "Adobe Campaign (AC)",
            "Adobe Advertising Cloud, Paid Media (AAC/ADCLOUD)",
            "Other"
        ],
        prerequisitesList: [
            'has AA',
            'has AT',
            'has AAC',
            'has AdCloud',
            'has AEM',
            'has AT Premium',
            'has DTM',
            'no AT'
        ],
        whoItBenefitsList: [
            "AT Owners", "Project Managers", "AT Implementation Team", "Content Team", "AEC Owners", "Stakeholders",
            "AdCloud Users", "Optimisation Team", "SEM/Media Team", "Performance Marketing Team", "Advertisers",
            "AEC Technical Team", "Project Teams", "Agile Teams", "Internal Optimisation", "Product Team", "Strategy Team",
            "Tech Team", "Developers", "AA Analysts", "AA Owners", "AEC Owners and Managers",
            "AAM Users", "AT Users", "AT Analysts", "AT Performance/Reporting Team", "AA Developers", "Social Media Team", 
            "AT Recommendations Users", "AT Recommendations Implementation Team", "AA Users", "Tag Specialists", "Teams That Will Engage with Design Team",
            "Teams That Will Engage with PDD", "Tech Implementation Team", "Display/Media Team", "AEM Owners", "Anyone New to Programmatic",
            "AT Implementation/QA Team", "Leads and Stakeholders", "NA", "Solution Specialists", "AAM Planners",
            "AAM Tech Team", "Data, Team", "Tag Managers", "Analytics Managers", "Implementation Specialists", "Various"
        ],
        contentName: '',
        fileUpload: '',
        description: '',
        solution: '',
        prerequisites: [],
        whoItBenefits: []
    }
    
    onFormSubmit = () => {
        // axios post request to express server
    }

    onInputChange = (fieldName) => {
        return (event) => {
            this.setState({ [fieldName]: event.target.value });
        }
    }

    onSelectInputChange = (fieldName) => {
        return (event) => {
            const options = event.target.options;
            let newArray = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    newArray.push(options[i].value);
                }
            }
            this.setState({ [fieldName]: newArray });
        }
    }

    render() {
        const { 
            solutionsList,
            prerequisitesList,
            whoItBenefitsList,
            contentName,
            solution,
            description,
            prerequisites,
            whoItBenefits
        } = this.state;

        return (
            <>
                <h1>AddFilesForm</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <input type='file' name='fileUploaded' />
                    </div>
                    <div>
                        <label>Content Name</label>
                        <input type='text' onChange={this.onInputChange('contentName')} value={contentName} />
                    </div>
                    <div>
                        <label>Solution</label>
                        <select onChange={this.onInputChange('solution')} value={solution}>
                            {solutionsList.sort().map((element) => {
                                return <option key={element} value={element.match(/(?<=\().*(?=\))/)}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Date created</label>
                        <input type='date' name='dateCreated' />
                    </div>
                    <div>
                        <label>Description/goal</label>
                        <textarea onChange={this.onInputChange('description')} value={description}></textarea>
                    </div>
                    <div>
                        <label>Prerequisites</label>
                        <select multiple={true} onChange={this.onSelectInputChange('prerequisites')} value={prerequisites}>
                            {prerequisitesList.sort().map((element) => {
                                return <option key={element} value={element.replace(/ /g, '')}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Who it benefits</label>
                        <select multiple={true} onChange={this.onSelectInputChange('whoItBenefits')} value={whoItBenefits}>
                            {whoItBenefitsList.sort().map((element) => {
                                return <option key={element} value={element.replace(/ /g, '')}>{element}</option>
                            })}
                        </select>
                    </div>
                    <input type='submit' />
                </form>
            </>
        );
    }
}

export default AddFilesForm;