import React, { Component } from "react";
import Viewer from "./../PDF-embed";
import RelatedContent from "./../RelatedContent";

class ShowContent extends Component {

    render(){
        return(
            <>  
                < RelatedContent />
                < Viewer
                    pdfBlob = "dummy.pdf"
                />
            </>
        )
    }
}

export default ShowContent;