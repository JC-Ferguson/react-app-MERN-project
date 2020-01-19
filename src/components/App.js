import React, { Component } from "react";
import Viewer from "./PDF-embed";
import PDFJSBackend from "./../backends/pdfjs";

class App extends Component {

    render(){
        return(
            <> 
                < Viewer
                    backend = {PDFJSBackend}
                    src = "sample.pdf"
                />
            </>
        )
    }
}

export default App;