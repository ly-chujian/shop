
import React from "react";
import OthersInfo1 from "./otherInfo1.jsx";

export default class OthersInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {show:false,entity:[]};
    }

    goo(){
        //this.props.history.push({pathname:this.props.match.url+"/one",params:{id:1}});
        if(this.state.show){
            this.setState({show:false,entity:[]});
        }else{
            this.setState({show:true,entity:[{name:1}]});
        }
    }

    render(){
        console.log(this.props.location,"---------otherInfo");
        return (
            <div>
                <input type="button" value="go 1" onClick = {this.goo.bind(this)} />
                <div>this is other info and id is {this.props.match.params.id}</div>
                <OthersInfo1 flag={this.state.show} entity={this.state.entity} />
            </div>
        )
    }
}