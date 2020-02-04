import React, {Component} from "react";
import PDFObject from "pdfobject";
import { connect } from "react-redux";
import styles from "./../../styles/ShowContentPage.module.css";

class PdfViewer extends Component {

    componentDidMount() {
        // node package that renders pdf files directly in browser
        const {pdfBlob, containerId} = this.props;      
        PDFObject.embed(`${process.env.REACT_APP_EXPRESS}/file/${pdfBlob}`, `#${containerId}`)
    }

    componentDidUpdate(){
        const {pdfBlob, containerId} = this.props;      
        PDFObject.embed(`${process.env.REACT_APP_EXPRESS}/file/${pdfBlob}`, `#${containerId}`)
    }

    render(){
        const {width, height, containerId, styling, mostRecentDocument} = this.props;
        const { id } = this.props.match.params;

        return (
            <div className = {styling} >
                <h1>{mostRecentDocument.location === id ? mostRecentDocument.name:"LESSON NOT FOUND"}</h1>
                <div id={containerId} className={styles.pdfViewer} style = {{width, height}} /> 
            </div>
        )
    }
}
  
PdfViewer.defaultProps = {
    containerId: 'pdf-viewer',
    width: '75%',
    height: '75vh',
};

const mapStateToProps = (state)=>{
    const { mostRecentDocument } = state.lastViewed;
    return {
        mostRecentDocument: mostRecentDocument
    }
}
export default connect(mapStateToProps)(PdfViewer);