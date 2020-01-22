import React, { Component } from "react";
import Viewer from "./../PDF-embed";
import RelatedContent from "./../RelatedContent";

class ShowContent extends Component {

    // lessonToSearchQuery=(contentName)=>{
    //     const s3Query = contentName.toLowerCase() + ".pdf";
    //     return s3Query;
    // }

    render(){
        const { contentName } = this.props;
        return(
            <>  
                < RelatedContent />
                < Viewer
                    pdfBlob = {`sample.pdf`}
                />
            </>
        )
    }
}

export default ShowContent;