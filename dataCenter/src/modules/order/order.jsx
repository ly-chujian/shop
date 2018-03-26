import React from 'react';

import TableList from "../../core/tableList/table";
 
export default class Order extends React.Component{
    constructor(props){
        super(props);   

        this.action = this.action.bind(this);
        this.convert = this.convert.bind(this);

        this.edit = this.edit.bind(this);
        this.run = this.run.bind(this);
        this.change = this.change.bind(this);
        this.search = this.search.bind(this);

        this.tableOptions = {
            actions :[
                {key:"edit",val:"修改",action:this.edit},
                {key:"run",val:"Run",action:this.run}
            ],
            showCk:true,
            map:[
                {key:"describe",val:"测试用例描述",action:this.action},
                {key:"operator",val:"操作人",convert:this.convert},
                {key:"operator",val:"操作人2",convert:this.convert,action:this.action},
                {key:"runTime",val:"操作时间",type:"date"},
                {key:"runTime",val:"操作时间1",type:"datetime"},
                {key:"runTime",val:"操作时间2",type:"time"},
                {key:"items.length",val:"用例个数"}
            ],
            getUrl:()=>{
                return "/api/at/list?describe=";
            },
            pageOption:{
                sizeKey:"size",
                indexKey:"index",
                index:1,
                size:10
            },
            analysis:(data)=>{
                return {
                    data:data.data.data,
                    count:data.data.count
                };
            }
        }
    }

    edit(row){
        alert("edit " + row._id);
    }
    run(row){
        alert("run " + row._id);
    }

    action(row,item){
        alert(row._id);
    }
    convert(row,item){
        if(row.operator == "aaa"){
            return "管理员";
        }else{
            return row.operator;
        }
    }
    change(){
        let s = this.refs['tk'].getCheckedItems();
        console.log("selected items is " + s);
    }
    search(){
        let tk = this.refs['tk'];
        tk.search();
    }

    render(){
        return (
            <div>
                <input type="button" onClick={this.change} value="get" />
                <input type="button" onClick={this.search} value="search" />
                <TableList ref='tk' options={this.tableOptions} />
            </div>
        );
    }
}