/**
 * Created by wupeng5 on 2017/6/12.
 */
import React from "react";
import Util from "../tools/util.jsx";
export default class Body extends React.Component{
    constructor(props) {
        super(props);
        this.setCkAll = this.setCkAll.bind(this);
        this.getCkIds = this.getCkIds.bind(this);

        this.state = {data:this.props.data};
    }

    getActionsById(item,row){
        if(item.action){
            item.action(row);
        }
    }

    componentWillMount(){
        console.log("body componentWillMount");
    }

    componentDidMount(){
        console.log("body componentDidMount");
        var that = this;
        eventCtl.on("__BodyCkAllOn",function(flag){
            that.setCkAll(flag);
        })
    }

    componentWillReceiveProps(next){
        this.setState({data:next.data});
    }

    getSingleRow(row,cols){
        var col = [];
        var showck = this.props.showCk;
        var showActions = false;
        var that = this;
        if(this.props.actions.length != 0){
            showActions = true;
        }
        if(showck){
            col.push(<td className="text-center" key={Math.random()} style={{position: 'relative'}}><input data-load="false" checked={row.ck} type="checkbox" onChange={e=>this.checkOne(e,row)} /></td>);
        }
        if(showActions){
            var tmp = [];
            this.props.actions.map(item=>{
                tmp.push(<a data-load="false" className="btn btn-default btn-xs" key={Math.random()} onClick={e=>this.getActionsById(item,row)}>{item.val}</a>);
            })
            col.push(<td key={Math.random()}  className="text-center">{tmp}</td>);
        }
        cols.map(field=> {
            var key = field.key;
            var res = "";
            //处理boolean类型 ， react不渲染 boolean类型,这里需要转换成字符串
            typeof row[key] == "boolean"?res=row[key].toString():res=row[key];
            if(field.convert && field.action ){
                col.push(<td className="text-center" key={Math.random()}><a data-load="false" onClick={e=>this.aAction(field,row)}>{field.convert(row[key])}</a></td>);
            }
            else if(field.convert && !field.action){
                col.push(<td className="text-center" key={Math.random()}>{field.convert(row)}</td>);
            }
            else if(!field.convert && field.action){
                col.push(<td className="text-center" key={Math.random()}><a data-load="false" onClick={e=>this.aAction(field,row)}>{res}</a></td>);
            }
            else{
                col.push(<td className="text-center" key={Math.random()}>{res}</td>);
            }
        })
        return col;
    }

    aAction(field,row){
        field['action'](row);
    }

    checkCkCount(){
        var num = 0;
        this.state.data.map(item=>{
            if(item.ck){
                num++;
            }
        })
        if(num == this.state.data.length){
            return true;
        }
        return false;
    }

    checkOne(e,row){
        row.ck = !row.ck;
        this.setState({data:this.state.data});
        eventCtl.broadcast("__HeaderCkAllOn",this.checkCkCount());
        this.props.ckcb(this.getCkIds());
    }

    getCkIds(){
        var res = [];
        this.state.data.map(item=>{
            if(item.ck){
                res.push(item.__tmpId);
            }
        })
        return res;
    }

    setCkAll(flag){
        this.state.data.map(item=>item.ck = flag);
        this.setState({data:this.state.data});
    }

    getRows(cols){
        var that = this;
        var html = [];
        this.state.data.map(row=>
            html.push(<tr ref={row.__tmpId} key={Math.random()} onClick={e=>this.selectRow(e,row)}>{that.getSingleRow(row,cols)}</tr>));
        return html;
    }

    selectRow(e,row){
        //阻止重新渲染, 不是每个操作都需要重新setState
        //if(e.target.type == "checkbox" || e.target.tagName == "A"){
        //    if(e.target.getAttribute("data-load") == "false"){
        //        return;
        //    }
        //}
        //row.ck = !row.ck;
        //this.setState({data:this.state.data});
        //eventPublisher.broadcast("__HeaderCkAllOn",this.checkCkCount());
        //this.props.ckcb(this.getCkIds());
    }

    render() {
        console.log("body render function");
        var html = this.getRows(this.props.cols);
        return (
            <tbody>
                {html}
            </tbody>
        );
    }
}