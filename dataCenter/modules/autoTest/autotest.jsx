import React from 'react';

import Util from "../../core/tools/util.jsx";
import TK from "../../core/tableKill/table.jsx";

export default class AutoTest extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name:"",
            data:""
        }

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
                {key:"url",val:"url"},
                {key:"sendType",val:"请求类型"},
                {key:"describe",val:"测试用例描述"},
                {key:"operator",val:"操作人"},
                {key:"runTime",val:"操作时间",convert:that.cTime}
            ],
            getUrl:function(){
                return "/api/at/list?name="+that.state.name;
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
    }

    cTime(item){
        var time = new Date(item.runTime);
        return time.toLocaleDateString() + " " + time.toLocaleTimeString();
    }

    edit(item){

    }

    run(item){

    }

    search(){
        this.refs['tableKill'].search();
    }

    render(){
        return (
            <div>
                name:<input type="text" value={this.state.name} onChange={e=>{this.setState({name:e.target.value});this.tableOptions.isReRender = false;}} />
                <input type="button" value="Search" onClick={e=>{this.tableOptions.isReRender=true;this.search();}} />
                <TK ref="tableKill" option ={this.tableOptions}></TK>
            </div>
        );
    }
}