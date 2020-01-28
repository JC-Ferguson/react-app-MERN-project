import React, { Component } from 'react';
import customAxios from './../../api/customAxios';

class AddFilesForm extends Component {
    state = {
        solutions: [
            "Adobe Experience Cloud (AEC)", 
            "Adobe Analytics, Dynamic Tag Management (AA)", 
            "Adobe Target (AT)", 
            "Adobe Audience Member (AAM)", 
            "Adobe Campaign (AC)",
            "Adobe Advertising Cloud, Paid Media (AAC/ADCLOUD)",
            "Other"
        ],
        prerequisites: [
            'Has AA',
            'Has AT',
            'has AAC',
            'Has AdCloud',
            'Has AEM',
            'Has AT Premium',
            'Has DTM', 'No AT'
        ],
        teams: [
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
    }
    
    onFormSubmit = () => {

    }
    
    render() {
        const { solutions } = this.state;

        return (
            <>
                <h1>AddFilesForm</h1>
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <input type='file' name='fileUploaded' />
                    </div>
                    <div>
                        <label>Content Name</label>
                        <input type='text' name='contentName' />
                    </div>
                    <div>
                        <label>Category</label>
                        <select multiple name='category'>
                            {solutions.map((element) => {
                                return <option value={element.match(/(?<=\().*(?=\))/)}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Date created</label>
                        <input type='date' name='dateCreated' />
                    </div>
                    <div>
                        <label>Description/goal</label>
                        <textarea></textarea>
                    </div>
                    <div>
                        <label>Prerequisites</label>
                        <select multiple name='prerequisites'>
                            <option value='hasAA'>Has AA</option>
                            <option value='hasAT'>Has AT</option>
                            <option value='hasAAC'>Has AAC</option>
                            <option value='hasAdCloud'>Has AdCloud</option>
                            <option value='hasAEM'>Has AEM</option>
                            <option value='hasATPremium'>Has AT Premium</option>
                            <option value='hasDTM'>Has DTM</option>
                            <option value='hasNoAT'>No AT</option>
                        </select>
                    </div>
                    <div>
                        <label>Who it benefits</label>
                        <select multiple name='whoItBenefits'>
                            <option value='option1'>Option1</option>
                        </select>
                    </div>
                    <input type='submit' />
                </form>
            </>
        );
    }
}

export default AddFilesForm;