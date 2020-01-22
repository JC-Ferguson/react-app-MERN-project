import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CategoryPage from "./views/CategoryPage";
import ShowContentPage from "./views/ShowContent";


class App extends Component {
    state = {
        contentName: ""
    }

    onLessonSelection = (data)=>{
        console.log(data);
        this.setState({contentName: data })
    }

    render(){
        const { contentName } = this.state;

        return(
            <BrowserRouter>
                <div>
                    {/* < Route exact path = "/login" component = {} />
                    < Route exact path = "/register" component = {} />
                    < Route exact path = "/home" component = {} /> */}
                    < Route exact path = "/category" render={(props)=>{
                                return < CategoryPage {...props} contentName = {contentName.toLowerCase()} onLessonSelection={this.onLessonSelection} />
                            }} 
                    />
                    < Route 
                            exact path = "/lesson/:id" render={(props)=>{
                                return < ShowContentPage {...props} contentName = {contentName.toLowerCase()}  />
                            }} 
                    />
                    {/* < Route exact path = "/admin/dash" component = {} />
                    < Route exact path = "/admin/user-access" component = {} />
                    < Route exact path = "/admin/content-crud" component = {} /> */}
                </div>
            </BrowserRouter>
        )
    }
}

export default App;