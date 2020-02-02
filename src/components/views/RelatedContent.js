import React, { Component } from "react";
import { connect } from "react-redux";
import SearchResult from "./../views/SearchResult";
import style from "./../../styles/ShowContentPage.module.css";

class RelatedContent extends Component {
    getRandomContent(arr, n) {
        let result = new Array(n);
        let len = arr.length;
        const taken = new Array(len);       
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            let x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    render(){
        const { learningContent, mostRecentQuery, styles, heading } = this.props;
        const unreadContent = learningContent.filter(e => {
            // stringified to compare if two objects are identical
            if (JSON.stringify(e) !== JSON.stringify(this.props.mostRecentDocument)){
                return e;
            }
        })

        const relatedContent = this.getRandomContent(unreadContent, unreadContent.length > 3 ? 3 : unreadContent.length );
        return(
            <div className= {styles}>
                {heading?<h3>{heading}</h3> :<h3>BECAUSE YOU SEARCHED FOR: {mostRecentQuery}</h3>}
                    {relatedContent.map(content =>{
                        return(
                            < SearchResult
                                key ={content.location}
                                title = {content.name}
                                date = {content.tags.createdOn}
                                solution = {content.tags.solution}
                                proficiency = {content.tags.proficiency}
                                content = {content.tags.content}
                                desc = {content.tags.description}
                                prereq= {content.tags.prerequisites}
                                benefits = {content.tags.benefits}
                                s3FileName = {content.location}
                                styling = {style.destroy}
                            />
                        )
                    })}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    const { learningContent } = state.searchResult;
    const { mostRecentQuery } = state.mostRecentSearch;
    const { mostRecentDocument } = state.lastViewed;
    return {
        learningContent: learningContent,
        mostRecentQuery: mostRecentQuery,
        mostRecentDocument: mostRecentDocument
    } 
}

export default connect(mapStateToProps)(RelatedContent);