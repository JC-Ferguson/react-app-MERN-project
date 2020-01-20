import React, { Component } from "react";
import Viewer from "./PDF-embed";

class App extends Component {

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

export default App;