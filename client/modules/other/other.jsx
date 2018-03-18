
import React from "react";
import { Route} from 'react-router-dom';
import OthersInfo from "./otherInfo.jsx";

export default class Others extends React.Component{
    constructor(props){
        super(props);
    }

    info(){
        var s = 1;
        this.props.history.push({pathname:"/others/"+s,params:{id:1}});
    }

    render(match){
        console.log(this.props.match,"---------other");
        return (
            <div>
                <div>
                    <input type="button" value="info" onClick={this.info.bind(this)} />
                </div>
                this is other view outside navigation
                <Route exact path="/others/:id" component={OthersInfo} />
            </div>
        )
    }
}