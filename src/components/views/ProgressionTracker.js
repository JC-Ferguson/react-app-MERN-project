import React, { Component } from 'react';
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";

class ProgressionTracker extends Component {
    
    render(){
        const { progressTracker } = this.props;

        // spreads all nested array into parent array
        function flatten(arr) {
            return arr.reduce(function (flat, toFlatten) {
              return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
          
        }

        // calls the flatten function and returns only unique values
        function flattenAndUniqArr(arr){
            const merge = flatten(arr);
            let uniqueItems = [...new Set(merge)];
            return uniqueItems;
        }

        // retrieves solutions, who it benefits, and prerequisites tags from the viewed documents and returns value only once
        const sortViewedDocs = (arr) => {
            const tags = ["solution", "benefits", "prerequisites"]; 
            const viewedTags = [[],[],[]]
            for (let i=0; i<3; i++){
                arr.forEach(content => {
                    let tag = JSON.parse(content).tags[tags[i]]
                    if (!viewedTags[i].includes(tag)){
                        viewedTags[i].push((tag));
                    };                
                });
            }
            const benefitsArr = flattenAndUniqArr(viewedTags[1]);
            const prereqsArr = flattenAndUniqArr(viewedTags[2]);
            viewedTags.splice(1,2, benefitsArr, prereqsArr);
            return viewedTags;
        }

        // creates non nested array of all bars that will be created
        const tagsViewed = sortViewedDocs(progressTracker);
        const progressBars = flatten(tagsViewed);

        const obj = {};
        progressTracker.forEach(element => {
            let lesson = JSON.parse(element);
            obj[lesson.tags.solution] ? obj[lesson.tags.solution] ++ : obj[lesson.tags.solution] = 1;
            obj[lesson.tags.benefits] ? obj[lesson.tags.benefits] ++ : obj[lesson.tags.benefits] = 1;
            obj[lesson.tags.prerequisites] ? obj[lesson.tags.prerequisites] ++ : obj[lesson.tags.prerequisites] = 1;
        });

        console.log(obj);

        return (
            <>
                {progressBars.map(tag =>{
                    return < Progress value = "3" total = "5" progress= "ratio" label = {tag} />
                })}
            </>
        )
    }
}

const mapStateToProps=(state)=>{
    const { progressTracker } = state.progressTracker;
    return {
        progressTracker: progressTracker
    }
}

export default connect(mapStateToProps)(ProgressionTracker);