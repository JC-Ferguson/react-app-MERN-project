import React, {Component} from "react";
import PDFObject from "pdfobject";
import styles from "./../../styles/ShowContentPage.module.css";

class PdfViewer extends Component {

    componentDidMount() {
        const {pdfBlob, containerId} = this.props;      
        const options = {
                PDFJS_URL: `http://localhost:3001/file/${pdfBlob}`,
                forcePDFJS: true,
        }

        PDFObject.embed(`http://localhost:3001/file/${pdfBlob}`, `#${containerId}`, options)
    }





    render(){
        const {width, height, containerId} = this.props;

        return (
            <>
                <div id={containerId} className={styles.pdfViewer} style = {{width, height}} /> 
          </>
        )
    }
}
  
PdfViewer.defaultProps = {
    containerId: 'pdf-viewer',
    width: '75%',
    height: '85vh',
};

export default PdfViewer;