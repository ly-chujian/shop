
import React from "react";
import Util from "../tools/util.jsx";

export default class Header extends React.Component{
    constructor(props) {
        super(props);

        this.showCk = this.props.showCk;
        this.actions = this.props.actions;

        this.setAll = this.setAll.bind(this);
        this.reSetCols = this.reSetCols.bind(this);

        this.ck = this.props.ck;

        this.allKey = Math.random();
        
        this.state = {cols:this.props.cols,ck:this.props.ck}

        this.originCols = this.props.originCols
    }

    shouldComponentUpdate(nextProps,nextState){
        let ckCok = this.state.ck == nextProps.ck;
        let blCol = Util.object.equalsObject(this.state.cols,nextProps.cols);
        return !(blCol&&ckCok);
    }

    componentWillReceiveProps(nextProps){
        this.setState({cols:nextProps.cols,ck:nextProps.ck});
    }

    reSetCols(index){
        let cols = Util.object.cloneObj(this.originCols);
        cols.length=index;
        this.props.noticeChangeCols(cols);
    }

    setAll(){
        this.props.accpetHBNotice({ck:!this.state.ck},null);
    }

    getHeaderHTML(){
        let html = [];
        if(this.showCk){
            html.push(<th className="text-center" key={Math.random()}><input checked={this.state.ck} type="checkbox" onChange={this.setAll} /></th>);
        }
        if(this.actions && this.actions.length != 0){
            html.push(<th className="text-center" key={Math.random()}>操作<input type="button" value="4列" onClick={e=>this.reSetCols(4)} /><input type="button" value="2列" onClick={e=>this.reSetCols(2)} /></th>);
        }
        this.state.cols.map(item=>{
            html.push(<th key={Math.random()}>{item.val}</th>);
        })
        return html;
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.getHeaderHTML()}
                </tr>
            </thead>
        );
    }
}