import React, { Component, PropTypes } from "react";
import PDFObject from "pdfobject";

class PDF_Embed extends Component {

    
    constructor(props) {
        super(props);
        this.viewerRef = React.createRef();
        this.backend = new props.backend();
    }

    componentDidMount() {
        const { src, pdfBlob, containerId } = this.props;
        const element = this.viewerRef.current;
        const options = {
            PDFJS_URL: `/pdfjs-2.2.228-dist/web/viewer.html?file=${pdfBlob}`,
            forcePDFJS: true
        }
    
        this.backend.init(src, element);

        PDFObject.embed(pdfBlob, `#${containerId}`);
    }

    render(){
        const {width, height, containerId} = this.props;

        return (
            <>
            <div ref={this.viewerRef} id='viewer' style={{ width: '100%', height: '100%' }}>
        
            </div>
            <div id={containerId} style = {{width, height}} /> 
            </>
        )
    }
}
  
PDF_Embed.defaultProps = {
    containerId: 'pdf-viewer',
    width: '100%',
    height: '50vh',
    src: "sample.pdf"
};

export default PDF_Embed;