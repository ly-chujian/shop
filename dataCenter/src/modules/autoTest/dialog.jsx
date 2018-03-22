import React from 'react';
import Util from "../../core/tools/util.jsx";
import Css from "./autotest.css";
import { observer } from 'mobx-react';

import AutoTestStore from "../../store/autoTest/store.jsx";

const store = new AutoTestStore();

@observer
export default class AutoTestDialog extends React.Component{
    constructor(props) {
        super(props);

        this.describeEl = null;
        this.isBeforeEl = null;
        this.beforeUrlEl = null;
        this.beforeTypeEl = null;
        this.beforeDataEl = null;

        //this.observer = this.props.autoTestStore;
        this.observer = store;
        this.initData =this.observer.dialogData.data;
        this.observer.setDialogAllStates(this.initData,{show:this.props.show,id:this.props.id});

        this.getBeforeData = this.getBeforeData.bind(this);
        this.getCaseItems = this.getCaseItems.bind(this);
        this.getCkStatus = this.getCkStatus.bind(this);

        this.caseItems = null;
    }

    cancel(){
        //this.observer.showDialog = false;
        this.props.cb(false);
    }

    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.id && nextProps.show){
            Util.doFetch("/api/at/getItems/"+nextProps.id).then(d=>{
                if(d.data.length == 1){
                    this.caseItems = [...d.data[0].data.items];
                    this.observer.setDialogAllStates(d.data[0].data,{show:nextProps.show,id:nextProps.id});
                }
            })
        }else{
            this.caseItems = [...this.initData.items];
            this.observer.setDialogAllStates(this.initData,{show:nextProps.show,id:""});
        }
    }

    save(){
        var data = {
            describe:this.describeEl.value,
            before:this.getBeforeData(),
            items:this.getCaseItems()
        }
        if(this.observer.dialogData.params.show && this.observer.dialogData.params.id){
            performanceTool.setStart();
            Util.ajaxServer.doFetch("/api/at/edit/"+this.observer.dialogData.params.id,"post",data).then(d=>{
                if(!d.rc){
                    alert(d.data);
                }
                performanceTool.compare("AUTOEDIT");
                this.props.cb(true);
            })
        }else{
            performanceTool.setStart();
            Util.ajaxServer.doFetch("/api/at/add","post",data).then(d=>{
                if(!d.rc){
                    alert(d.data);
                }
                performanceTool.compare("AUTOADD");
                this.props.cb(true);
            })
        }
    }

    addItems(){
        this.caseItems.push({
            url:"",
            sendType:"get",
            sendData:null,
            itemDesc:""
        });
        this.observer.setCaseItems(this.caseItems);
    }

    reduce(item,index){
        this.caseItems.splice(index,1);
        this.observer.setCaseItems(this.caseItems);
    }

    getCkStatus(data){
        var res = "";
        for(var i =0;i<data.length;i++){
            if(data[i].checked){
                res = data[i].value;
                break;
            }
        }
        return res;
    }

    getBeforeData(){
        return {
            isBefore:this.getCkStatus(this.isBeforeEl.querySelectorAll("input[type=radio]")),
            beforeType:this.getCkStatus(this.beforeTypeEl.querySelectorAll("input[type=radio]")),
            beforeUrl:this.beforeUrlEl.value,
            beforeData:this.beforeDataEl.value
        }
    }
    getCaseItems(){
        this.caseItems.map(item=>{
            item.itemDesc = item.itemDescEl.value;
            item.sendData = item.sendDataEl.value;
            item.sendType = this.getCkStatus(item.sendTypeEl.querySelectorAll("input[type=radio]"));
            item.url = item.urlEl.value;
            delete item.itemDescEl;
            delete item.sendDataEl;
            delete item.sendTypeEl;
            delete item.urlEl;
        })
        return this.caseItems;
    }

    render(){
        console.log("render dialog");
        if(this.observer.dialogData.params.show){
            return (
                <div style={{display:this.observer.dialogData.params.show==true?"block":"none"}}>
                    <div className={Css.black}></div>
                    <div class="modal" style={{display:"block"}}>
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button class="close" onClick={e=>{this.cancel();}}><span>&times;</span><span class="sr-only"></span></button>
                                    <h4 class="modal-title">维护数据</h4>
                                </div>

                                <div className={Css.overflowY + " modal-body"}>
                                    <form class="form-horizontal tableForm" role="form" >
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label titleLang" >测试用例描述:</label>
                                            <div class="col-sm-8">
                                                <input type="text" ref={el=>{this.describeEl = el;}} class="form-control input-sm" defaultValue={this.observer.dialogData.data.describe} />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label titleLang" >是否需要注入数据:</label>
                                            <div class="col-sm-8" ref={el=>{this.isBeforeEl = el;}}>
                                                <input type="radio" class="input-sm" value="true" name="isBefore" defaultChecked={this.observer.dialogData.data.before.isBefore == "true"} />是
                                                <input type="radio" class="input-sm" value="false" name="isBefore" defaultChecked={this.observer.dialogData.data.before.isBefore == "false"}/>否
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label titleLang" >请求URL:</label>
                                            <div class="col-sm-8">
                                                <input type="text" ref={el=>{this.beforeUrlEl = el;}} class="form-control input-sm" defaultValue={this.observer.dialogData.data.before.beforeUrl} />
                                            </div>
                                            <label class="col-sm-3 control-label titleLang" >请求方式:</label>
                                            <div class="col-sm-8" ref={el=>{this.beforeTypeEl = el;}}>
                                                <input type="radio" class="input-sm" name="beforeType" value="get" defaultChecked={this.observer.dialogData.data.before.beforeType == "get"} />get
                                                <input type="radio" class="input-sm" name="beforeType" value="post" defaultChecked={this.observer.dialogData.data.before.beforeType == "post"} />post
                                            </div>
                                            <label class="col-sm-3 control-label titleLang" >参数data:</label>
                                            <div class="col-sm-8">
                                                <textarea ref={el=>{this.beforeDataEl = el;}} defaultValue={this.observer.dialogData.data.before.beforeData}></textarea>
                                            </div>
                                        </div>
                                        <h3 className={Css.inline}>单元测试数据</h3> <input class="btn btn-default btn-sm" type="button" value=" + " onClick={e=>{this.addItems();}} />

                                        {this.caseItems.map((item,index) =>{
                                            var ckName = Math.ceil(Math.random()*1000000);
                                            return (
                                                <div class="form-group">
                                                    <label class="col-sm-3 control-label titleLang" >描述:</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" ref={el=>item.itemDescEl = el} class="form-control input-sm" defaultValue={item.itemDesc} />
                                                    </div>
                                                    <label class="col-sm-3 control-label titleLang" >请求URL:</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" ref={el=>item.urlEl = el} class="form-control input-sm" defaultValue={item.url} />
                                                    </div>
                                                    <label class="col-sm-3 control-label titleLang" >请求方式:</label>
                                                    <div class="col-sm-8" ref={el=>item.sendTypeEl = el}>
                                                        <input type="radio" class="input-sm" value="get" name={ckName} defaultChecked={item.sendType == "get"} />get
                                                        <input type="radio" class="input-sm" value="post" name={ckName} defaultChecked={item.sendType == "post"} />post
                                                    </div>
                                                    <label class="col-sm-3 control-label titleLang" >参数data:</label>
                                                    <input type="button" value=" - " class="btn btn-default btn-sm" onClick={e=>{this.reduce(item,index);}} />
                                                    <div class="col-sm-8">
                                                        <textarea defaultValue={item.sendData} ref={el=>item.sendDataEl = el}></textarea>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <input type="button" class="btn btn-default" value="取消" onClick={e=>{this.cancel();}} />
                                    <input type="button" class="btn btn-primary" value="确定" onClick={e=>{this.save();}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return <div></div>;
        }
    }
}







