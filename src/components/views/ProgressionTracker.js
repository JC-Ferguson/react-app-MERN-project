import React, { Component } from 'react';
import { connect } from "react-redux";
import { setProgressTracker, setUserViewedTags, setTotalViewedTags } from "./../../actions";
import { Progress } from "semantic-ui-react";
import customAxios from "./../../api/customAxios";
import refresh from "./../../images/icons8-refresh-16.png";

class ProgressionTracker extends Component {
    state = {
        totalTagProgress: null,
        progressKeys: null,
        progress: null,
        progressTracker: []
    }

    componentDidMount(){
        // if local storage is reset and progress tracker is null resets to empty array
        const { progressTracker, setProgressTracker } = this.props;
        if (!progressTracker){
            setProgressTracker();
        }
    }

    // changes state storing the progress in tags at content viewed, n.b when storage is cleared upon first click errors out (caught by try/catch) on subsequent click runs properly
    onProgressCheck = (obj, func)=>{
        const { setUserViewedTags, setTotalViewedTags } = this.props;
        const { totalTagProgress } = this.state;

        setUserViewedTags(obj);
        setTotalViewedTags(totalTagProgress);
        (async () => {
            const { userProgress, totalProgress } = this.props;
            try {
                const progress = await func(userProgress, totalProgress);
                const progressKeys = Object.keys(progress); 

                this.setState({progressKeys: progressKeys, progress: progress });
            } catch (err){
                console.log("Unable to track progress please try again");
                console.log(err);
            }
        })()
    }

    // saves value of total length of tags viewed not tags seen by user
    saveValue = (obj, state) => {
        if (state && !state.totalTagProgress && JSON.stringify(state.totalTagProgress) !== JSON.stringify(obj) ){
            // console.log(obj)
            this.setState({totalTagProgress: obj});
        }
    }

    render(){

        // spreads all nested array into parent array
        function flatten(arr) {
            return arr.reduce(function (flat, toFlatten) {
                return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);

        }

        // calls the flatten function and returns only unique values
        function flattenAndUniqArr(arr) {
            const merge = flatten(arr);
            let uniqueItems = [...new Set(merge)];
            return uniqueItems;
        }

        // retrieves solutions, who it benefits, and prerequisites tags from the viewed documents and returns value only once
        function sortViewedDocs(arr){
            const tags = ["solution", "benefits", "prerequisites"];
            const viewedTags = [[], [], []]
            for (let i = 0; i < 3; i++) {
                arr.forEach(content => {
                    let tag = JSON.parse(content).tags[tags[i]]
                    if (!viewedTags[i].includes(tag)) {
                        viewedTags[i].push((tag));
                    };
                });
            }
            const benefitsArr = flattenAndUniqArr(viewedTags[1]);
            const prereqsArr = flattenAndUniqArr(viewedTags[2]);
            viewedTags.splice(1, 2, benefitsArr, prereqsArr);
            return viewedTags;
        }

        // creates object that counts the amount of documents viewed based on a tag
        function tagsViewCounter(lessonsViewed, func){
            const obj = {
                solution: {},
                benefits: {},
                prerequisites: {}
            };
            const tags = Object.keys(obj);
            lessonsViewed.forEach(element => {
                let lesson = JSON.parse(element);
                for (let i = 0; i < 3; i++){
                    switch(tags[i]){
                        case "benefits":
                        case "prerequisites":
                            lesson.tags[tags[i]].forEach(el =>{
                                obj[tags[i]][el] ? obj[tags[i]][el]++ : obj[tags[i]][el] = 1;
                            })
                            break;
                        default:
                            obj[tags[i]][lesson.tags[tags[i]]] ? obj[tags[i]][lesson.tags[tags[i]]]++ : obj[tags[i]][lesson.tags[tags[i]]] = 1;
                    }
                }
            });
            return obj;
        }

        // creates object that counts amount of total documents based on tags
        async function totalTagCounter(arr, func, state){
            let obj2 = {
                solution: {},
                benefits: {},
                prerequisites: {}
            };

            for (let i = 0; i < 3; i++){
                arr[i].forEach(  (tag) => {
                    let query = { querySolution: "", queryBenefits: "", queryPrereqs: "" };
                    const searchTags = Object.keys(query);
                    query[searchTags[i]] = tag;
            
                    const { querySolution, queryBenefits, queryPrereqs } = query;
                    customAxios.post("/category", {
                        querySolution,
                        queryBenefits,
                        queryPrereqs
                    })
                    .then( response => {
                        return response.data.length;
                    })
                    .then((data) =>{
                        const keys = Object.keys(obj2);
                        obj2[keys[i]][tag] = data;
                        return JSON.parse(JSON.stringify(obj2));
                    })
                    .then(obj => {
                        func(obj, state);
                    });
                })
            }
        }

        // creates the progression values with tags returning object with tag keys and value as array of length 2 with documents viewed at index 0 and total documents at index 1 
        function createProgressValues(tagsViewObj, totalObj){
            const emptyObj = {}
            const keys = Object.keys(tagsViewObj);

            const tagsArr = [ tagsViewObj, totalObj]
            for (let i = 0; i < 2; i++){
                keys.forEach(key =>{
                    const keyArr = Object.keys(tagsArr[i][key]);
                    for (let tag of keyArr){
                        emptyObj[tag] ? emptyObj[tag].push(tagsArr[i][key][tag]) : emptyObj[tag] = [tagsArr[i][key][tag]]
                    }
                })
            }
            return emptyObj;
        }

        // creates non nested array of all bars that will be created
        const progressTracker = this.props.progressTracker || this.state.progressTracker;
        const tagsViewed = sortViewedDocs(progressTracker);

        const usersViewedCounter = tagsViewCounter(progressTracker);
        totalTagCounter(tagsViewed, this.saveValue, this.state);

        const { progress, progressKeys } = this.state;
        const { blueStyle, headingStyle, indent, logoStyle } = this.props;

        return (
            <>
                { progressTracker[0] ? <><h3 className = { headingStyle } onClick ={ () => this.onProgressCheck(usersViewedCounter, createProgressValues)}>Check Lesson Progression</h3><span className = { `${blueStyle} ${indent}` }></span></>: null }
                { progressKeys && <img src = {refresh} alt = "refresh icon" onClick = {() => this.onProgressCheck(usersViewedCounter, createProgressValues)} className = {logoStyle} /> }
                { progressKeys && progressKeys.map(key =>{
                    return (
                            < Progress value= {progress[key][0]} total= {progress[key][1]} progress="ratio" label={key} key = {key} indicating />
                    )
                })}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { progressTracker, userProgress, totalProgress } = state.progressTracker;
    return {
        progressTracker: progressTracker,
        userProgress: userProgress,
        totalProgress: totalProgress
    }
}

export default connect(mapStateToProps, { setUserViewedTags, setTotalViewedTags, setProgressTracker })(ProgressionTracker);