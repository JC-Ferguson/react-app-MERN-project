import React, { Component } from 'react';
import customAxios from './../../api/customAxios';
import { connect } from 'react-redux';
import styles from './../../styles/form.module.css';
import {solutions, teams, prerequisites} from "./../../services/category_tags";

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

class AddFilesForm extends Component {
    state = {
        solutionsList: solutions,
        prerequisitesList: prerequisites,
        whoItBenefitsList: teams,
        proficiencyList: [
            "NA", "1", "2", "3", "4", "5"
        ],
        selectedFile: null,
        contentName: '',
        generic: true,
        solution: 'AAC/ADCLOUD',
        dateCreated: '',
        proficiency: 'NA',
        lessonContent: '', 
        description: '',
        prerequisites: [],
        whoItBenefits: [],
        submitted: false
    };

    constructor(props) {
        super(props)
        this.fileInput = React.createRef()
    }
    
    // send data from form to express server using axios
    onFormSubmit = (event) => {
        event.preventDefault();
        const { 
            selectedFile,
            contentName,
            generic,
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
        fileData.append('generic', generic);
        fileData.append('solution', solution);
        fileData.append('dateCreated', dateCreated);
        fileData.append('proficiency', proficiency);
        fileData.append('lessonContent', lessonContent)
        fileData.append('description', description);
        fileData.append('prerequisites', prerequisites);
        fileData.append('whoItBenefits', whoItBenefits);

        // axios post request to express server with authorization header
        const { token } = this.props;
        customAxios.post('/file/upload', fileData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => console.log(res))

        this.setState({         
            selectedFile: null,
            contentName: '',
            solution: 'AAC/ADCLOUD',
            dateCreated: '',
            proficiency: 'NA',
            lessonContent: '', 
            description: '',
            prerequisites: [],
            whoItBenefits: [],
            submitted: true
        });

        this.fileInput.current.value = '';
    }

    // closure used to set state based on fieldName parameter
    onInputChange = (fieldName) => {
        return (event) => {
            this.setState({ [fieldName]: event.target.value });
        }
    }

    // sets state by using an array of all elements selected in select tag
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

    // sets state using the file uploaded
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
            whoItBenefits,
            submitted,
            generic
        } = this.state;

        return (
            <div>
                <h1 className={styles.centered}>Add a new file</h1>
                {submitted ? <p className={styles.greenWarning}>File successfully submitted</p> : null}
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <input className={styles.inputFile} type='file' onChange={this.onFileUploadChange} ref={this.fileInput} />
                    </div>
                    <div>
                        <label className={styles.label}>Content Name</label>
                        <input className={styles.inputFilesForm} type='text' onChange={this.onInputChange('contentName')} value={contentName} />
                    </div>
                    <div>
                        <label className={styles.label}>Content Type</label>
                        <select className={styles.select} onChange={this.onInputChange('generic')} value={generic}>
                            <option key="generic" value= {true} >Generic</option>
                            <option key="non-generic" value= {false} >Non-Generic</option>
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Solution</label>
                        <select className={styles.select} onChange={this.onInputChange('solution')} value={solution}>
                            {solutionsList.sort().map((element) => {
                                return <option key={element} value={element.match(/(?<=\().*(?=\))/) || element}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Date created</label>
                        <input className={styles.inputFilesForm} type='date' onChange={this.onInputChange('dateCreated')} value={dateCreated} />
                    </div>
                    <div>
                        <label className={styles.label}>Lesson Proficiency</label>
                        <select className={styles.select} onChange={this.onInputChange('proficiency')} value={proficiency}>
                            {proficiencyList.map((element) => {
                                return <option key={element} value={element}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Lesson Content</label>
                        <textarea className={styles.inputFilesForm} onChange={this.onInputChange('lessonContent')} value={lessonContent}></textarea>
                    </div>
                    <div>
                        <label className={styles.label}>Description/goal</label>
                        <textarea className={styles.inputFilesForm} onChange={this.onInputChange('description')} value={description}></textarea>
                    </div>
                    <div>
                        <label className={styles.label}>Prerequisites</label>
                        <select className={styles.select} multiple={true} onChange={this.onSelectInputChange('prerequisites')} value={prerequisites}>
                            {prerequisitesList.sort().map((element) => {
                                return <option key={element} value={element}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Who it benefits</label>
                        <select className={styles.select} multiple={true} onChange={this.onSelectInputChange('whoItBenefits')} value={whoItBenefits}>
                            {whoItBenefitsList.sort().map((element) => {
                                return <option key={element} value={element}>{element}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.centered}>
                        <input className={`${styles.inputSubmit} ${styles.inputSubmitAdmin}`} type='submit' />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddFilesForm);