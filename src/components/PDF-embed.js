import React, {Component} from "react";
import PDFObject from "pdfobject";

class PDF_Embed extends Component {

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
                <div id={containerId} style = {{width, height}} /> 
          </>
        )
    }
}
  
PDF_Embed.defaultProps = {
    containerId: 'pdf-viewer',
    width: '75%',
    height: '75vh',
};

export default PDF_Embed;