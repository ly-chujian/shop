
import React from "react";
import Util from "../tools/util.jsx";

export default class Header extends React.Component{
    constructor(props) {
        super(props);

        this.showCk = this.props.showCk;
        this.actions = this.props.actions;
        this.hk = this.props.hk;
        this.bk = this.props.bk;

        this.setAll = this.setAll.bind(this);
        this.reSetCols = this.reSetCols.bind(this);

        this.state = {ck:false,cols:this.props.cols};
    }

    shouldComponentUpdate(nextProps,nextState){
        let blCk = this.state.ck == nextState.ck;
        let blCol = Util.equalsObject(this.state.cols,nextProps.cols);
        return !(blCk&&blCol);
    }

    componentWillReceiveProps(nextProps){
        this.setState({cols:nextProps.cols});
    }

    componentDidMount(){
        
    }

    reSetCols(){
        let cols = Util.cloneObj(this.state.cols);
        cols.length=2
        this.props.resetColsCb(cols);
    }

    setAll(){
        this.setState({ck:!this.state.ck});
        eventCtl.broadcast(this.bk, this.state.ck);
    }

    getHeaderHTML(){
        let html = [];
        if(this.showCk){
            html.push(<th className="text-center" key={Math.random()}><input checked={this.state.ck} type="checkbox" onChange={this.setAll} /></th>);
        }
        if(this.actions){
            html.push(<th className="text-center" key={Math.random()}>操作<input type="button" value="2列" onClick={this.reSetCols} /></th>);
        }
        this.state.cols.map(item=>{
            html.push(<th key={Math.random()}>{item.val}</th>);
        })
        return html;
    }

    render() {
        console.log(this.state.cols,111);
        return (
            <thead>
                <tr>
                    {this.getHeaderHTML()}
                </tr>
            </thead>
        );
    }
}