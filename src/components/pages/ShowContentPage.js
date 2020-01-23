import React, { Component } from "react";
import PdfViewer from "../views/PDF-embed";
import RelatedContent from "../views/RelatedContent";

class ShowContentPage extends Component {
    render(){
        const {id: fileName} = this.props.match.params
        return(
            <>  
                < RelatedContent />
                < PdfViewer
                    pdfBlob = {`${fileName}`}
                />
            </>
        )
    }
}

export default ShowContentPage;