import React from 'react';

import Util from "../../core/tools/util.jsx";
import TK from "../../core/tableKill/table.jsx";
import AutoTestDialog from "./dialog.jsx";

import AutoTestStore from "../../store/autoTest/store.js";

import { observer } from 'mobx-react';

const store = new AutoTestStore();

//@inject('autoTestStore')
@observer
export default class AutoTest extends React.Component{
    constructor(props){
        super(props);

        //this.observer = this.props.autoTestStore;
        this.observer = store;

        this.edit = this.edit.bind(this);
        this.run = this.run.bind(this);

        this.selectSingleItemId = "";
        this.selectedItems = [];
        this.search = this.search.bind(this);

        var that = this;
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
                {key:"runTime",val:"操作时间",convert:this.cTime},
                {key:"before",val:"用例个数",convert:this.cCount}
            ],
            getUrl:()=>{
                var name = that.observer.name;
                if(that.searchNameEl){
                    name = that.searchNameEl.value;
                }
                return "/api/at/list?describe="+name;
            },
            pageOption:{sizeKey:"size",indexKey:"index"},
            analysis:(data)=>{
                return {
                    data:data.data.data,
                    count:data.data.count,
                    total:data.data.total
                };
            },
            //是否重新渲染table
            isReRender:true
        }

        this.searchNameEl = null;

        this.oldVal = "";
    }

    componentDidMount(){

    }
    componentWillMount(){

    }

    componentWillUnmount(){

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
        this.observer.setAutoTestShow(true);
    }

    run(item){
        Util.doFetch("/api/at/run?id="+item._id).then(d=>{
            if(d.rc){
                alert("成功运行的case:"+ d.data.y.join(','));
            }else{
                alert(d.data);
            }
        })
    }

    runMultiple(){
        Util.doFetch("/api/at/run?id="+Util.getArrayByField("_id",this.selectedItems).join(',')).then(d=>{
            if(d.rc){
                alert("成功运行的case:"+ d.data.y.join(','));
            }else{
                alert(d.data);
            }
        })
    }

    search(){
        if(this.oldVal ==  this.searchNameEl.value){
            this.tableOptions.isReRender=false;
        }else{
            this.tableOptions.isReRender=true;
            this.refs['tableKill'].search();
        }
        this.oldVal = this.searchNameEl.value;
    }

    addItem(){
        this.selectSingleItemId = "";
        this.tableOptions.isReRender = false;
        this.observer.setAutoTestShow(true);
    }

    cb(flag){
        if(flag){
            this.tableOptions.isReRender = true;
            this.refs["tableKill"].search();
        }
        this.observer.setAutoTestShow(false);
    }

    render(){
        console.log("render auto test");
        return (
            <div>
                <input type="button" value="Add" onClick = {e=>this.addItem()} />
                <input type="button" value="Run" onClick = {e=>this.runMultiple()} />
                name:<input type="text" defaultValue={this.observer.name} ref={el=>this.searchNameEl = el} />
                <input type="button" value="Search" onClick={e=>this.search()} />
                {/* <TK ref="tableKill" option ={this.tableOptions}></TK>

                <AutoTestDialog id={this.selectSingleItemId} show={this.observer.showDialog} cb={flag=>{this.cb(flag);}} /> */}
            </div>
        );
    }
}