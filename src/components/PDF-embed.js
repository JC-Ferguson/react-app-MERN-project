import React, {Component} from "react";
import PDFObject from "pdfobject";

class PDF_Embed extends Component {

    componentDidMount() {
        const {pdfBlob, containerId} = this.props;
        const options = {
            PDFJS_URL: `/pdfjs-2.2.228-dist/web/viewer.html?file=${pdfBlob}`,
            forcePDFJS: true
        }

        PDFObject.embed(pdfBlob, `#${containerId}`);
        console.log(PDFObject.embed(pdfBlob, `#${containerId}`, options))
    }

    render(){
        const {width, height, containerId} = this.props;

        return (
            <div id={containerId} style = {{width, height}} /> 
        )
    }
}
  
PDF_Embed.defaultProps = {
    containerId: 'pdf-viewer',
    width: '75%',
    height: '50vh',
};

export default PDF_Embed;