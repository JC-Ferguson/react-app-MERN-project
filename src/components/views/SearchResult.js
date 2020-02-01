import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./../../styles/SearchResult.module.css";


class SearchResult extends Component {
    render(){
        const { title, date, solution, proficiency, content, desc, prereq, benefits, s3FileName } = this.props;
        return(
            <>  
                <section className={styles.resultContainer}>
                    <div className = {styles.title}> 
                        <Link to={`/lesson/${s3FileName}`}><h1>{title}</h1></Link><h3>Created On: {date}</h3>
                    </div>
                    <div className = {styles.spContainer}>
                        <div><h3>Solution:</h3><p>{solution}</p></div>
                        <div><h3>Proficiency Level:</h3><p>{proficiency}</p></div>
                    </div>
                    <div className = {styles.restContainer}>
                        <div>
                            <h3>File Content:</h3><p>{content}</p>
                            <h3>Who it Benefits:</h3><p>{benefits.join(", ")}</p>
                        </div>
                        <div>
                            <h3>Description:</h3><p>{desc}</p>
                            <h3>Prerequisites:</h3><p>{prereq.join(", ")}</p>
                        </div>
                    </div>
                </section>
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