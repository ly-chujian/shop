
import Util from "../../core/tools/util.jsx";
import TK from "../../core/tableKill/table.jsx";
import React from "react";

export default class Person extends React.Component{
    constructor(props){
        super(props);
        this.state = {name:"", age:""};
        this.edit = this.edit.bind(this);
        this.detail = this.detail.bind(this);
        this.del = this.del.bind(this);

        var that = this;
        this.selectedItems = [];
        this.tableOptions = {
            actions :[
                {key:"edit",val:"修改",action:this.edit},
                {key:"edit",val:"详情",action:this.detail},
                {key:"edit",val:"删除",action:this.del}
            ],
            showCk:true,
            scb:function(items){
                that.selectedItems = items;
            },
            map:[
                {key:"_id",val:"ID"},
                {key:"name",val:"姓名"},
                {key:"ageName",val:"年龄",action:that.actionAge},
                {key:"address",val:"地址"},
                {key:"app",val:"app版本"}
            ],
            getUrl:function(){
                return "/api/person/list?name="+that.state.name;
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
            isReRender:true
        }
    }

    render(){
        console.log("personList match: ",this.props.match.params);
        console.log("personList location: ",this.props.location);
        return (
            <div>
                <div>
                    姓名:<input type="text" value={this.state.name} onChange={e=>{this.tableOptions.isReRender = false;this.setState({name: e.target.value});}} />
                    年龄:<input type="text" value={this.state.age} onChange={e=>{this.tableOptions.isReRender = false;this.setState({age: e.target.value});}} />
                    <input type="button" value="查询" onClick={this.search.bind(this)} />
                    <input type="button" value="添加" onClick={this.add.bind(this)} />
                </div>
                <TK ref="tableKill" option ={this.tableOptions} />
            </div>
        )
    }

    //新增
    add(){
        this.props.history.push({pathname:"/personSave/add/new"});
    }
    //查询
    search(){
        this.tableOptions.isReRender = true;
        this.refs['tableKill'].search();
    }

    //*************************列表的函数*************************//
    //列表的 edit
    edit(item){
        console.log("edit ",item);
        this.props.history.push({pathname:"/PersonSave/edit/"+item._id,params:{selectedItems:item}});
    }
    //删除
    del(item){
        if(!window.confirm("delete?")){
            return;
        }
        Util.doFetch("/api/person/deletePerson?id="+item._id).then(d=>{
            if(d.rc){
                this.search();
            }
        })
    }
    //列表的 detail
    detail(item){
        console.log("detail ",item);
        this.props.history.push({pathname:"/PersonSave/detail/"+item._id,params:{selectedItems:item}});
    }

    //年龄列上面的action
    actionAge(item){
        console.log("td element click event, click item is ", item);
    }
    //*************************列表的函数*************************//
}