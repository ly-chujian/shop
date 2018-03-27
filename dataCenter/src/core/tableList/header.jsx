
import React from "react";
import Util from "../tools/util.jsx";

export default class Header extends React.Component{
    constructor(props) {
        super(props);

        this.setAll = this.setAll.bind(this);
        this.showChangeColsDialog = this.showChangeColsDialog.bind(this);

        
        this.defaultCols = Util.arrayServer.addPrimaryAndCk(Util.object.cloneObj(this.props.originCols),true);
        this.itemCheckChange = this.itemCheckChange.bind(this);

        this.showCk = this.props.showCk;
        this.actions = this.props.actions;
        this.ck = this.props.ck;
        this.originCols = this.props.originCols;
        this.cols = this.props.cols;
        
        this.chooseColsKey = Math.ceil(Math.random()*1000000000);
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
    theadData(){
        let html = [
            <div key={Math.random()} className='colsModal' ref={this.chooseColsKey}>
                {this.colsLen()}
                <div className="bot">
                    <button ref={this.colsBtnCalcelKey} className='btn btn-sm btn-light'>取消</button>
                    <button ref={this.colsBtnSaveKey} className='btn btn-sm btn-info' onClick={e=>this.reSetCols()}>确定</button>
                </div>
            </div>
        ];
        return html;
    }
    showChangeColsDialog(){
        let _dom = this.refs[this.chooseColsKey];
        if(_dom.style.display == "block"){
            this.refs[this.chooseColsKey].style.display = "none";
        }else{
            this.refs[this.chooseColsKey].style.display = "block";
        }
    }

    getHeaderHTML(){
        let html = [];
    
        if(this.showCk){
            html.push(<th className="text-center" key={Math.random()}><input checked={this.ck} type="checkbox" onChange={this.setAll} /></th>);
        }
        if(this.actions && this.actions.length != 0){
            html.push(<th className="text-center" key={Math.random()} className='thCols'>操作</th>);
        }
        this.cols.map((item,index)=>{
            if(index == 0){
                html.push(<th key={Math.random()} className='oneTh'>
                            <i className='icon icon-tuichu' onClick={this.showChangeColsDialog}></i>{item.val}
                            {this.theadData()}
                    </th>);
            }else{
                html.push(<th key={Math.random()}>{item.val}</th>);
            }
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