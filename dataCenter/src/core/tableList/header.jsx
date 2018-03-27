
import React from "react";
import Util from "../tools/util.jsx";

export default class Header extends React.Component{
    constructor(props) {
        super(props);

        this.setAll = this.setAll.bind(this);
        this.defaultCols = Util.arrayServer.addPrimaryAndCk(Util.object.cloneObj(this.props.originCols),true);
        this.itemCheckChange = this.itemCheckChange.bind(this);

        this.showCk = this.props.showCk;
        this.actions = this.props.actions;
        this.ck = this.props.ck;
        this.originCols = this.props.originCols;
        this.cols = this.props.cols;
    }

    shouldComponentUpdate(nextProps,nextState){
        let ckCok = this.ck == nextProps.ck;
        let blCol = Util.object.equalsObject(this.cols,nextProps.cols);
        return !(blCol&&ckCok);
    }

    componentWillReceiveProps(nextProps){
        // debugger
        // this.setState({cols:nextProps.cols,ck:nextProps.ck});
    }

    setAll(){
        this.props.accpetHBNotice({ck:!this.ck},null);
    }

    colsLen(){
        let html = [];
        this.defaultCols.map((item,index)=>{
            html.push(<p key={Math.random()}><input type="checkbox" defaultChecked={item.ck} onClick={e=>{this.itemCheckChange(item,e)}}/><span>{item.val}</span></p>)
        })
        return html;
    }

    itemCheckChange(item,e){
        item.ck = !item.ck;
        e.target.checked = item.ck;
    }

    reSetCols(){
        let cols = Util.arrayServer.getCheckedItems(this.defaultCols).items;
        this.props.noticeChangeCols(cols);
    }

    getHeaderHTML(){
        let html = [];
    
        if(this.showCk){
            html.push(<th className="text-center" key={Math.random()}><input checked={this.ck} type="checkbox" onChange={this.setAll} /></th>);
        }
        if(this.actions && this.actions.length != 0){
            html.push(<th className="text-center" key={Math.random()} className='thCols'>操作
            <div className='colsModal' style={{display:'none'}}>
                {this.colsLen()}
                <div className="bot">
                    <button className='btn btn-sm btn-default'>取消</button>
                    <button className='btn btn-sm btn-info' onClick={e=>this.reSetCols()}>确定</button>
                </div>
            </div>
            </th>);
        }
        this.cols.map(item=>{
            html.push(<th key={Math.random()}>{item.val}</th>);
        })
        return html;
    }

    render() {
        //重新获取最新的cols，而不是去componentWillReceiveProps生命周期内部获取最新的
        this.cols = this.props.cols;
        this.ck = this.props.ck;
        console.log("%crender header","color:red");
        return (
            <thead className="thead-dark">
                <tr>
                    {this.getHeaderHTML()}
                </tr>
            </thead>
        );
    }

    //销毁不在react管控内的事件以及其他
    componetWillUnmount(){

    }
}