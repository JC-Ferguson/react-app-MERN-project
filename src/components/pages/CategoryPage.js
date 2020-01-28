import React, { Component } from "react";
import SearchResult from "../views/SearchResult";
import { connect } from "react-redux";

class CategoryPage extends Component {
    render(){
        const { learningContent } = this.props;
        return(
            <> 
                <h1>Category Page</h1>
                {learningContent.map(content =>{
                    return(
                        < SearchResult
                            content = {content.name}
                            date = {content.tags.createdOn}
                            desc = {content.tags.description}
                            prereq= {content.tags.prerequisites}
                            benefits = {content.tags.benefits}
                        />
                    )
                })}
            </>
        )
    }
}


const mapStateToProps = (state)=>{
    const { learningContent } = state.searchResult;
    return {
        learningContent: learningContent
    }
}

export default connect(mapStateToProps)(CategoryPage);