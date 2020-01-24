import React, { Component } from "react";
import SearchResult from "../views/SearchResult";

class CategoryPage extends Component {
    render(){
        return(
            <>  
                < SearchResult
                    content = "Dummy"
                    date = "22/01"
                    desc = "This is the 1st practice pdf"
                    prereq= "dont need any"
                    benefits = "me"
                />
                < SearchResult
                    content = "Sample"
                    date = "22/01"
                    desc = "This is the 1st practice pdf"
                    prereq= "dont need any"
                    benefits = "me lad"
                />
            </>
        )
    }
}

export default CategoryPage;