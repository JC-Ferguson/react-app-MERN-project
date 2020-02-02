import React, { Component } from "react";
import SearchResult from "../views/SearchResult";
import { connect } from "react-redux";

class CategoryPage extends Component {
    render(){
        const { learningContent, mostRecentQuery } = this.props;
        return(
            <> 
                <h1>Category Page</h1>
                <h2>Showing Search Results for: {mostRecentQuery}</h2>
                {learningContent.map(content =>{
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
                        />
                    )
                })}
            </>
        )
    }
}


const mapStateToProps = (state)=>{
    const { learningContent } = state.searchResult;
    const { mostRecentQuery } = state.mostRecentSearch;
    return {
        learningContent: learningContent,
        mostRecentQuery: mostRecentQuery
    }
}

export default connect(mapStateToProps)(CategoryPage);