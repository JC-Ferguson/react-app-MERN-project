import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ShowContentPage from "./views/ShowContent";

class SearchResult extends Component {

    render(){
        const { contentName, date, desc, prereq, benefits, onLessonSelection } = this.props;
        return(
            <>  
                <div>
                    <BrowserRouter>
                        <Link to={`/lesson/${contentName.toLowerCase()}.pdf`} onClick = {()=>onLessonSelection(contentName)}><h1>{contentName}</h1></Link><h3>{date}</h3>
                        <h3>Description:</h3><p>{desc}</p>
                        <h3>Prerequisites:</h3><p>{prereq}</p>
                        <h3>Who it Benefits:</h3><p>{benefits}</p>
                        <h3>Related Content:</h3>
                        <ul>
                            <li>Lesson</li>
                            <li>Lesson</li>
                        </ul>
                    </BrowserRouter>
                </div>
            </>
        )
    }
}

export default SearchResult;