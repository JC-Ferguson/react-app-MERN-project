import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class SearchResult extends Component {
    render(){
        const { title, date, proficiency, content, desc, prereq, benefits, s3FileName } = this.props;
        return(
            <>  
                <div>
                        <Link to={`/lesson/${s3FileName}`}><h1>{title}</h1></Link><h3>{date}</h3>
                        <h3>Proficiency Level:</h3><p>{proficiency}</p>
                        <h3>File Content:</h3><p>{content}</p>
                        <h3>Description:</h3><p>{desc}</p>
                        <h3>Prerequisites:</h3><p>{prereq}</p>
                        <h3>Who it Benefits:</h3><p>{benefits}</p>
                </div>
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

export default connect(mapStateToProps)(SearchResult);