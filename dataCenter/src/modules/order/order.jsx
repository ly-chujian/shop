import React from 'react';

import TableList from "../../core/tableList/table";
 
export default class Order extends React.Component{
    constructor(props){
        super(props);   

        this.tableOptions = {
            actions :[
                {key:"edit",val:"修改",action:this.edit},
                {key:"run",val:"Run",action:this.run}
            ],
            showCk:true,
            scb:(items)=>{
                this.selectedItems = items;
            },
            map:[
                {key:"describe",val:"测试用例描述"},
                {key:"operator",val:"操作人"},
                {key:"runTime",val:"操作时间"},
                {key:"before",val:"用例个数"}
            ],
            getUrl:()=>{
                return "/api/at/list?describe=";
            },
            pageOption:{sizeKey:"size",indexKey:"index"},
            analysis:(data)=>{
                return {
                    data:data.data.data,
                    count:data.data.count,
                    total:data.data.total
                };
            }
        }
    }

    render(){
        return (
            <TableList options={this.tableOptions} />
        );
    }
}