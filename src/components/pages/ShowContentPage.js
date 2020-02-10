import React, { Component } from "react";
import PdfViewer from "../views/PDF-embed";
import RelatedContent from "./../views/RelatedContent";
import { connect } from "react-redux";
import styles from "./../../styles/ShowContentPage.module.css";

class ShowContentPage extends Component {
    render(){
        const {id: fileName} = this.props.match.params;
        const { learningContent } = this.props
        return(
            <div className= {styles.container}>  
                {learningContent.length > 1 ? <RelatedContent styles ={styles.relatedContainer} heading= "Related Content" onShowPage = {true}/> : null}
                < PdfViewer
                    pdfBlob = {`${fileName}`}
                    styling = {styles.pdfContainer}
                    {...this.props}
                />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    const { learningContent } = state.searchResult;
    return {
        learningContent: learningContent,
    } 
}

export default connect(mapStateToProps)(ShowContentPage);