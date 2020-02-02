import React, { Component } from 'react';
import customAxios from './../../api/customAxios';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

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
            'no AT',
            'None Required'
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
        proficiencyList: [
            "NA", "1", "2", "3", "4", "5"
        ],
        selectedFile: null,
        contentName: '',
        solution: 'AAC/ADCLOUD',
        dateCreated: '',
        proficiency: 'NA',
        lessonContent: '', 
        description: '',
        prerequisites: [],
        whoItBenefits: []
    }
    
    onFormSubmit = (event) => {
        event.preventDefault();
        // pull data we need off state
        const { 
            selectedFile,
            contentName,
            solution,
            dateCreated,
            proficiency, 
            lessonContent, 
            description,
            prerequisites,
            whoItBenefits
        } = this.state;

        let fileData = new FormData();
        fileData.append('file', selectedFile);
        fileData.append('name', contentName);
        fileData.append('solution', solution);
        fileData.append('dateCreated', dateCreated);
        fileData.append('proficiency', proficiency);
        fileData.append('lessonContent', lessonContent)
        fileData.append('description', description);
        fileData.append('prerequisites', prerequisites);
        fileData.append('whoItBenefits', whoItBenefits);

        // axios post request to express server
        // axios post form data only
        customAxios.post('/file/upload', fileData)
            .then(res => console.log(res))
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

    onFileUploadChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    render() {
        const { 
            solutionsList,
            prerequisitesList,
            whoItBenefitsList,
            proficiencyList,
            contentName,
            solution,
            dateCreated,
            proficiency,
            lessonContent, 
            description,
            prerequisites,
            whoItBenefits
        } = this.state;

        return (
            <>
                <h1>AddFilesForm</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <input type='file' onChange={this.onFileUploadChange} />
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
                        <input type='date' onChange={this.onInputChange('dateCreated')} value={dateCreated} />
                    </div>
                    <div>
                        <label>Lesson Proficiency</label>
                        <select onChange={this.onInputChange('proficiency')} value={proficiency}>
                            {proficiencyList.map((element) => {
                                return <option key={element} value={element}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Lesson Content</label>
                        <textarea onChange={this.onInputChange('lessonContent')} value={lessonContent}></textarea>
                    </div>
                    <div>
                        <label>Description/goal</label>
                        <textarea onChange={this.onInputChange('description')} value={description}></textarea>
                    </div>
                    <div>
                        <label>Prerequisites</label>
                        <select multiple={true} onChange={this.onSelectInputChange('prerequisites')} value={prerequisites}>
                            {prerequisitesList.sort().map((element) => {
                                return <option key={element} value={element}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Who it benefits</label>
                        <select multiple={true} onChange={this.onSelectInputChange('whoItBenefits')} value={whoItBenefits}>
                            {whoItBenefitsList.sort().map((element) => {
                                return <option key={element} value={element}>{element}</option>
                            })}
                        </select>
                    </div>
                    <input type='submit' />
                </form>
            </>
        );
    }
}

export default connect(mapStateToProps)(AddFilesForm);