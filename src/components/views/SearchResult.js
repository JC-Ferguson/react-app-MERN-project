import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./../../styles/SearchResult.module.css";
import { setLastViewed } from "./../../actions";


class SearchResult extends Component {

    state = {
        lastViewed: this.props.mostRecentDocument
    }

    saveAsViewed = (e)=>{
        for (let content of this.props.learningContent){
            if (content.name===e.target.innerHTML){
                console.log(content);
                this.props.setLastViewed(content);
                this.setState({ lastViewed: content});
                // this.props.history.push(`/lesson/${content.location}`);
            }
        }
    }

    render(){
        const { title, date, solution, proficiency, content, desc, prereq, benefits, s3FileName } = this.props;
        console.log(this.props.mostRecentDocument);

        return(
            <>  
                <section className={styles.resultContainer}>
                    <div className = {styles.title}> 
                        <Link to={`/lesson/${s3FileName}`}><h1 onClick = {this.saveAsViewed} >{title}</h1></Link><h3>Created On: {date}</h3>
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
    const { mostRecentDocument }= state.lastViewed;
    return {
        learningContent: learningContent,
        mostRecentDocument: mostRecentDocument
    }
}

export default connect(mapStateToProps , {setLastViewed})(SearchResult);