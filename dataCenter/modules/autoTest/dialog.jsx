import React from 'react';
import Css from "./autotest.css";

export default class AutoTestDialog extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render(){
        return (
            <div>
                <div className={Css.black}></div>
                <div class="modal" style={{display:"block"}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="close"><span>&times;</span><span class="sr-only"></span></button>
                                <h4 class="modal-title">维护数据</h4>
                            </div>

                            <div class="modal-body">
                                <form class="form-horizontal tableForm" role="form" >

                                    <div class="form-group">
                                        <label class="col-sm-3 control-label titleLang" >测试用例描述:</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-3 control-label titleLang" >是否需要注入数据:</label>
                                        <div class="col-sm-8">
                                            <input type="radio" class="input-sm" name="a"/>是
                                            <input type="radio" class="input-sm" name="a"/>否
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label titleLang" >请求URL:</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control input-sm" />
                                        </div>
                                        <label class="col-sm-3 control-label titleLang" >请求方式:</label>
                                        <div class="col-sm-8">
                                            <input type="radio" class="input-sm" name="b"/>get
                                            <input type="radio" class="input-sm" name="b"/>post
                                        </div>
                                        <label class="col-sm-3 control-label titleLang" >参数data:</label>
                                        <div class="col-sm-8">
                                            <textarea></textarea>
                                        </div>
                                    </div>
                                    <h3 style={{display:"inline"}}>单元测试数据</h3> <input class="btn btn-default btn-sm" type="button" value=" + " />
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label titleLang" >请求URL:</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control input-sm" />
                                        </div>
                                        <label class="col-sm-3 control-label titleLang" >请求方式:</label>
                                        <div class="col-sm-8">
                                            <input type="radio" class="input-sm" name="b"/>get
                                            <input type="radio" class="input-sm" name="b"/>post
                                        </div>
                                        <label class="col-sm-3 control-label titleLang" >参数data:</label>
                                        <div class="col-sm-8">
                                            <textarea></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="取消" />
                                <input type="button" class="btn btn-primary" value="确定" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}







