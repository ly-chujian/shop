import React from 'react';

import Util from "../../core/tools/util.jsx";
import TK from "../../core/tableKill/table.jsx";
import AutoTestDialog from "./dialog.jsx";

export default class AutoTest extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name:"",
            data:"",
            showDialog:false
        }

        this.edit = this.edit.bind(this);
        this.run = this.run.bind(this);

        var that = this;
        this.selectedItems = [];
        this.tableOptions = {
            actions :[
                {key:"edit",val:"修改",action:this.edit},
                {key:"run",val:"Run",action:this.run}
            ],
            showCk:true,
            scb:function(items){
                that.selectedItems = items;
            },
            map:[
                {key:"describe",val:"测试用例描述"},
                {key:"operator",val:"操作人"},
                {key:"runTime",val:"操作时间",convert:that.cTime},
                {key:"before",val:"用例个数",convert:that.cCount}
            ],
            getUrl:function(){
                return "/api/at/list?describe="+that.state.name;
            },
            pageOption:{sizeKey:"size",indexKey:"index"},
            analysis:function(data){
                var tmp = {
                    data:data.data.data,
                    count:data.data.count,
                    total:data.data.total
                };
                return tmp;
            },
            //是否重新渲染table
            isReRender:true
        }

        this.selectSingleItemId = "";
    }

    cCount(item){
        return item.items.length;
    }

    cTime(item){
        var time = new Date(item.runTime);
        return time.toLocaleDateString() + " " + time.toLocaleTimeString();
    }

    edit(item){
        this.selectSingleItemId = item._id;
        this.tableOptions.isReRender = false;
        this.setState({showDialog:true});
    }

    run(item){
        Util.fetchAjax("/api/at/run?id="+item._id).then(d=>{
            if(d.rc){
                alert("成功运行的case:"+ d.data.y.join(','));
            }else{
                alert(d.data);
            }
        })
    }

    runMultiple(){
        Util.fetchAjax("/api/at/run?id="+Util.getArrayByField("_id",this.selectedItems).join(',')).then(d=>{
            if(d.rc){
                alert("成功运行的case:"+ d.data.y.join(','));
            }else{
                alert(d.data);
            }
        })
    }

    search(){
        this.refs['tableKill'].search();
    }

    addItem(){
        this.selectSingleItemId = "";
        this.tableOptions.isReRender = false;
        this.setState({showDialog:true});
    }

    cb(flag){
        if(flag){
            this.tableOptions.isReRender = true;
            this.refs["tableKill"].search();
        }
        this.setState({showDialog:false});
    }

    render(){
        return (
            <div>
                <input type="button" value="Add" onClick = {e=>this.addItem()} />
                <input type="button" value="Run" onClick = {e=>this.runMultiple()} />
                name:<input type="text" value={this.state.name} onChange={e=>{this.setState({name:e.target.value});this.tableOptions.isReRender = false;}} />
                <input type="button" value="Search" onClick={e=>{this.tableOptions.isReRender=true;this.search();}} />
                <TK ref="tableKill" option ={this.tableOptions}></TK>

                <AutoTestDialog id={this.selectSingleItemId} show={this.state.showDialog} cb={flag=>{this.cb(flag);}} />
            </div>
        );
    }
}