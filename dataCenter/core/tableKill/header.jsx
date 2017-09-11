/**
 * Created by wupeng5 on 2017/6/12.
 */
import React from "react";
export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.setCkAllStatus = this.setCkAllStatus.bind(this);
        this.checkAll = this.checkAll.bind(this);

        this.state = {ck:false};
    }

    setCkAllStatus(flag){
        this.setState({ck:flag});
    }

    componentWillMount(){
        console.log("header componentWillMount");
    }

    componentDidMount(){
        console.log("header componentDidMount");
        var that = this;
        eventCtl.on("__HeaderCkAllOn",flag=>this.setState({ck:flag}));
    }

    checkAll(flag){
        this.state.ck = !this.state.ck;
        this.setState({ck:this.state.ck});
        eventCtl.broadcast("__BodyCkAllOn", this.state.ck);
        this.props.ckcb(this.state.ck);
    }

    render() {
        console.log("header render function");
        var cols = this.props.cols;
        var showActions = false;
        if(this.props.actions.length != 0){
            showActions = true;
        }
        //在遍历输出的时候，必须加上key，否则会报错.
        var html = [];
        if(this.props.showCk){
            html.push(<th className="text-center" key={Math.random()}><input checked={this.state.ck} type="checkbox" onChange={this.checkAll} /></th>);
        }
        if(showActions){
            html.push(<th className="text-center" key={Math.random()}>操作</th>);
        }
        cols.map(function(item){
            html.push(<th className="text-center" key={Math.random()}>{item.val}</th>);
        })
        return (
            <thead>
                <tr>{html}</tr>
            </thead>
        )
    }
}