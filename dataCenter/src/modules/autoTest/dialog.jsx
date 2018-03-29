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
                performanceTool.compare("AUTOEDIT");
                this.props.cb(true);
            })
        }else{
            performanceTool.setStart();
            Util.ajaxServer.doFetch("/api/at/add","post",data).then(d=>{
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
                    <div className="modal" style={{display:"block"}}>
                        <div className='black'></div>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">维护数据</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e=>{this.cancel();}}> 
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className={Css.overflowY + " modal-body"} style={{overflowY:'auto'}}>
                                    <form className="form-horizontal tableForm" role="form" >
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label col-form-label-sm text-right" >测试用例描述:</label>
                                            <div className="col-sm-8">
                                                <input type="text" ref={el=>{this.describeEl = el;}} className="form-control input-sm" defaultValue={this.observer.dialogData.data.describe} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label col-form-label-sm text-right " >是否需要注入数据:</label>
                                            <div className="col-sm-8" ref={el=>{this.isBeforeEl = el;}}>
                                                <div className="form-check form-check-inline">
                                                     <input className="form-check-input" type="radio" id="inlineRadio1" value="true"  name="isBefore" defaultChecked={this.observer.dialogData.data.before.isBefore == "true"}/>
                                                    <label className="form-check-label" htmlFor="inlineRadio1">是</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio"  id="inlineRadio2" value="false" name="isBefore" defaultChecked={this.observer.dialogData.data.before.isBefore == "false"}/>
                                                    <label className="form-check-label" htmlFor="inlineRadio2">否</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label col-form-label-sm text-right" >请求URL:</label>
                                            <div className="col-sm-8">
                                                <input type="text" ref={el=>{this.beforeUrlEl = el;}} className="form-control input-sm" defaultValue={this.observer.dialogData.data.before.beforeUrl} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label col-form-label-sm text-right" >请求方式:</label>
                                            <div className="col-sm-8" ref={el=>{this.beforeTypeEl = el;}}>
                                                <div className="form-check form-check-inline">
                                                     <input className="form-check-input" type="radio" id="inlineRadio3" value="get"  name="beforeType" defaultChecked={this.observer.dialogData.data.before.beforeType == "get"}/>
                                                    <label className="form-check-label" htmlFor="inlineRadio3">get</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio"  id="inlineRadio4" value="post" name="beforeType" defaultChecked={this.observer.dialogData.data.before.beforeType == "post"} />
                                                    <label className="form-check-label" htmlFor="inlineRadio4">post</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                                <label className="col-sm-3 col-form-label col-form-label-sm text-right" >参数data:</label>
                                                <div className="col-sm-8">
                                                    <textarea className="form-control input-sm" ref={el=>{this.beforeDataEl = el;}} defaultValue={this.observer.dialogData.data.before.beforeData}></textarea>
                                                </div>
                                        </div>
                                        <div className="form-group row">
                                             <h5 className={Css.inline + ' col-sm-3 text-right'}>单元测试数据</h5>
                                             <i className='icon icon-jiahao col-sm-8 text-right font26' onClick={e=>{this.addItems();}}></i>
                                        </div>

                                        {this.caseItems.map((item,index) =>{
                                            var ckName = Math.ceil(Math.random()*1000000);
                                            return (
                                                <div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm text-right" >描述:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" ref={el=>item.itemDescEl = el} className="form-control input-sm" defaultValue={item.itemDesc} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm text-right" >请求URL:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" ref={el=>item.urlEl = el} className="form-control input-sm" defaultValue={item.url} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm text-right" >请求方式:</label>
                                                    <div className="col-sm-8" ref={el=>item.sendTypeEl = el}>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio"  value="get"  name={ckName} defaultChecked={item.sendType == "get"}/>
                                                            <label className="form-check-label" >get</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio"   value="post" name={ckName} defaultChecked={item.sendType == "post"} />
                                                            <label className="form-check-label" >post</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm text-right" >参数data:</label>
                                                    <div className="col-sm-8">
                                                        <textarea  className="form-control input-sm" defaultValue={item.sendData} ref={el=>item.sendDataEl = el}></textarea>
                                                    </div>
                                                    <div className="col-sm-1" style={{marginLeft:'-10px'}}>
                                                         <i className='icon icon-jian  font26'  onClick={e=>{this.reduce(item,index);}}></i>
                                                    </div>
                                                </div>
                                                </div>
                                            );
                                        })}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-light" value="取消" onClick={e=>{this.cancel();}} />
                                    <input type="button" className="btn btn-primary" value="确定" onClick={e=>{this.save();}}/>
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







