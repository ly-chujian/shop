
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
        
        this.state = {cols:this.props.cols,ck:this.props.ck,radioVal:''}

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

   

    colsLen(){
        let html = [];
        let cols = Util.object.cloneObj(this.originCols);
        
        cols.map((item,index)=>{
            html.push(<p key={Math.random()}><input type="radio" name='radio' value={index+1} onChange={e=>this.changeRadio(e)}/><span>{index+1}列</span></p>)
        })
        return html;
    }

    changeRadio(e){
        this.setState({
            radioVal: e.target.value
        });
    }

    colsSave(){
        this.reSetCols(this.state.radioVal)
    }

    getHeaderHTML(){
        let html = [];
    
        if(this.showCk){
            html.push(<th className="text-center" key={Math.random()}><input checked={this.state.ck} type="checkbox" onChange={this.setAll} /></th>);
        }
        if(this.actions && this.actions.length != 0){
            html.push(<th className="text-center" key={Math.random()} className='thCols'>操作
            <div className='colsModal'>
                {this.colsLen()}
                <div className="bot">
                    <button className='btn'>取消</button>
                    <button className='btn' onClick={e=>this.colsSave()}>确定</button>
                </div>
            </div>
            <input type="button" value="4列" onClick={e=>this.reSetCols(4)} /><input type="button" value="2列" onClick={e=>this.reSetCols(2)} />
            </th>);
        }
        this.state.cols.map(item=>{
            html.push(<th key={Math.random()}>{item.val}</th>);
        })
        return html;
    }

    render() {
        console.log("render header");
        return (
            <thead>
                <tr>
                    {this.getHeaderHTML()}
                </tr>
            </thead>
        );
    }
}