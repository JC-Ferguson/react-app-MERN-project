import React, { Component } from "react";
import { connect } from "react-redux";
import SearchResult from "./../views/SearchResult";

class RelatedContent extends Component {
    
    // function randomly selects a set number of values from an array provided the number specified is less than the given arrays length 
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
        const { learningContent, styles, heading, onShowPage } = this.props;

        // stringified to compare if two objects are identical. unread content is checking search results and filtering out the document that has most recently been read so it is not in related content for itself
        const unreadContent = learningContent ? learningContent.filter(e => JSON.stringify(e) !== JSON.stringify(this.props.mostRecentDocument)) : null;

        const relatedContent = learningContent ? this.getRandomContent(unreadContent, unreadContent.length > 3 ? 3 : unreadContent.length ) : null;
        return(
            <div className= {styles}>
                {unreadContent && (heading?<h3>{heading}</h3> :<h3>BASED ON YOUR RECENT SEARCHES</h3>)}
                        {relatedContent && relatedContent.map(content =>{
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
                                    onShowPage = {onShowPage}
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