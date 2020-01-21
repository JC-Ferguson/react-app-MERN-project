import React, { Component } from "react";
import Viewer from "./../PDF-embed";

class ShowContent extends Component {

    render(){
        return(
            <> 
                < Viewer
                    pdfBlob = "dummy.pdf"
                />
            </>
        )
    }
}

export default ShowContent;