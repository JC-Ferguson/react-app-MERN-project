import React, { Component } from "react";
import SearchResult from "../SearchResult";


class CategoryPage extends Component {
    constructor(props){
        super(props)
        const state = {
            contentName: props.contentName
        }
    }
    componentDidMount(){
        const { contentName } = this.props;
        if (contentName){
            this.setState({contentName: contentName });
        }
    }

    // onLessonSelection = (data)=>{
    //     console.log(data);
    //     this.setState({contentName: data })
    // }

    render(){

        const { onLessonSelection } = this.props;

        return(
            <>  
                < SearchResult
                    contentName = "Dummy"
                    date = "22/01"
                    desc = "This is the 1st practice pdf"
                    prereq= "dont need any"
                    benefits = "me lad"
                    onLessonSelection = {onLessonSelection}
                />
                {/* < SearchResult
                    contentName = "Sample"
                    date = "22/01"
                    desc = "This is the 1st practive pdf"
                    prereq= "dont need any"
                    benefits = "me lad"
                    onLessonSelection = {this.onLessonSelection}
                /> */}
            </>
        )
    }
}

export default CategoryPage;