
import React from "react";
export default class OthersInfo1 extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var flag = "";
        this.props.flag?flag="block":flag="none";
        console.log(this.props.flag, "----------",flag);
        var name = "";
        this.props.entity.length == 0?name="":name=this.props.entity[0].name;
        return (
            <div style={{display:flag}}>
                <br/>{this.props.flag} ---------- this is otherinfo -------- {name}
            </div>
        )
    }
}