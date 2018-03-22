/**
 * Created by wupeng5 on 2017/6/12.
 */
import React from "react";
import Util from "../tools/util.jsx";
export default class Body extends React.Component{
    constructor(props) {
        super(props);

        this.showCk = this.props.showCk;
        this.actions = this.props.actions;

        this.selectRow = this.selectRow.bind(this);

        // this.state = {data:this.props.data,cols:this.props.cols};
        this.data = this.props.data;
        this.cols = this.props.cols;
        //记录上次data的ck状态，因为item.ck为引用类型,一旦发送变动，应该和上一次的data进行比较而决定是否进行渲染
        this.oldData = Util.object.cloneObj(this.props.data);
    }

    shouldComponentUpdate(nextProps,nextState){
        let blData = Util.object.equalsObject(this.oldData,nextProps.data);
        let blCols = Util.object.equalsObject(this.cols,nextProps.cols);
        return !(blData&&blCols);
    }

    componentWillReceiveProps(nextProps){
        // this.data = nextProps.data;
        // this.cols = nextProps.cols;
        // this.setState({data:nextProps.data,cols:nextProps.cols});
    }

    getCeilHTML(row){
        let col = [];
        if(this.showCk){
            col.push(<td key={Math.random()} className="text-center"><input defaultChecked={row.ck} type="checkbox" /></td>);
        }
        if(this.actions && this.actions.length != 0){
            let tmp = [];
            this.actions.map(item=>{
                tmp.push(<a className="btn btn-default btn-xs" key={Math.random()} onClick={e=>item.action(row)}>{item.val}</a>);
            })
            col.push(<td key={Math.random()} className="text-center">{tmp}</td>);
        }

        this.cols.map(item=>{
            let key = item.key;
            let val = "";
            if(typeof row[key] == "boolean"){
                val = row[key].toString();
            }else{
                let v = "row."+item.key;
                let tmp = eval("("+v+")");
                if(tmp == undefined){
                    val = "";
                }else{
                    let type = item.type;
                    if(type){
                        type = type.toLowerCase();
                        switch(type){
                            case "date":
                                val = Util.date.date(tmp);
                                break;
                            case "datetime":
                                val = Util.date.dateTime(tmp);
                                break;
                            case "time":
                                val = Util.date.time(tmp);
                                break;
                            default:
                                val = tmp;
                        }
                    }else{
                        val = tmp;
                    }
                }
            }
            
            //处理boolean类型 ， react不渲染 boolean类型,这里需要转换成字符串
            if(item.convert && item.action ){
                col.push(<td className="text-center" key={Math.random()}><a onClick={e=>item.action(row,item)}>{item.convert(row,item)}</a></td>);
            }
            else if(item.convert && !item.action){
                col.push(<td className="text-center" key={Math.random()}>{item.convert(row,item)}</td>);
            }
            else if(!item.convert && item.action){
                col.push(<td className="text-center" key={Math.random()}><a onClick={e=>item.action(row,item)}>{val}</a></td>);
            }
            else{
                col.push(<td className="text-center" key={Math.random()}>{val}</td>);
            }
        })
        return col;
    }

    selectRow(e,row){
        row.ck = !row.ck;
        this.props.accpetHBNotice(null,{data:this.data});
    }

    getBodyHTML(){
        let html = [];
        this.data.map(row=>{
            html.push(<tr key={Math.random()} onClick={e=>this.selectRow(e,row)}>{this.getCeilHTML(row)}</tr>);
        })
        return html;
    }

    render() {
        this.data = this.props.data;
        this.cols = this.props.cols;
        this.oldData = Util.object.cloneObj(this.props.data);
        console.log("%crender body","color:blue");
        return (
            <tbody>
                {this.getBodyHTML()}
            </tbody>
        );
    }
}