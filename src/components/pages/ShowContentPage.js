import React, { Component } from "react";
import PdfViewer from "../views/PDF-embed";
import RelatedContent from "../views/RelatedContent";
import styles from "./../../styles/ShowContentPage.module.css";

class ShowContentPage extends Component {
    render(){
        const {id: fileName} = this.props.match.params
        return(
            <div className= {styles.container}>  
                < RelatedContent />
                < PdfViewer
                    pdfBlob = {`${fileName}`}
                />
            </div>
        )
    }
}

export default ShowContentPage;