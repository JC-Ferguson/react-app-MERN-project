import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./../../styles/SearchResult.module.css";
import { setLastViewed } from "./../../actions";
import infoLogo from "./../../images/icons8-info-64.png";

class SearchResult extends Component {
    state = {
        lastViewed: this.props.mostRecentDocument,
    }

    // function saves the selected file as the last viewed document
    saveAsViewed = (e)=>{
        for (let content of this.props.learningContent){
            if (content.name===e.target.innerHTML){
                this.props.setLastViewed(content);
                this.setState({ lastViewed: content});
            }
        }
    }

    checkIfOutdated(date){
        const yearDiff = new Date().getFullYear() - new Date(date).getFullYear();
        const outOfDate = yearDiff > 1;
        return outOfDate
    }

    render(){
        const { title, date, solution, proficiency, content, desc, prereq, benefits, s3FileName, onShowPage } = this.props;

        this.checkIfOutdated(date)
        return(
            <>  
                <section className={ styles.resultContainer }>
                    <div className = {styles.title}> 
                        <Link to={`/lesson/${s3FileName}`}><h1 onClick = {this.saveAsViewed} >{title}</h1></Link>
                        <h3>Created On: {date}
                            {this.checkIfOutdated(date) ? <span title= "This content may be out of date.">
                                <img className={styles.flaggedImage} src={infoLogo} alt= "info icon"/>
                            </span> : null }
                        </h3>
                    </div>
                    <div className = {styles.spContainer}>
                        <div><h3>Solution:</h3><p>{solution}</p></div>
                        <div><h3>Proficiency Level:</h3><p>{proficiency}</p></div>
                    </div>
                   { onShowPage || <div className = {styles.restContainer}>
                        <div>
                            <h3>File Content:</h3><p>{content}</p>
                            <h3>Who it Benefits:</h3><p>{benefits.join(", ")}</p>
                        </div>
                        <div>
                            <h3>Description:</h3><p>{desc}</p>
                            <h3>Prerequisites:</h3><p>{prereq.join(", ")}</p>
                        </div>
                    </div>}
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