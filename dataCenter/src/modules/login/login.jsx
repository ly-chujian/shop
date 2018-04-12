import React from 'react';
import {Link,NavLink,BrowserRouter,Switch,Route,HashRouter} from 'react-router-dom';
import  './login.css';
import { renderRoutes } from 'react-router-config';

import Util from "../../core/tools/util.jsx";
import Layout from "../layout/layout.jsx";

import { observer, inject } from 'mobx-react';
@inject('loginUserStore')
@observer
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.observer = this.props.loginUserStore;
    }

    login(){
        var name = this.refs['__loginName'].value;
        var pwd = this.refs['__loginPwd'].value;

        if(name != "" && pwd != ""){
            performanceTool.setStart();
            Util.ajaxServer.doFetch(ModuleRequestUrl.LOGIN.login,"post",{name:name,pwd:pwd}).then(d=>{
                performanceTool.compare("LOGIN");
                Util.cookie.setCookie(CookieKeys.SHOPUSERNAME,name);
                this.observer.setUser(name);
                this.props.history.push({pathname:"/"});
            })
        }
    }

    componentDidMount(){
        this.refs['__loginName'].value = this.observer.user.name;
    }

    register(){
        Util.ajaxServer.doFetch(ModuleRequestUrl.LOGIN.register,"post",{name:"a",pwd:"a"})
    }

    render(){
        return(
            <div>
                <div className='black'></div>
                <div className='loginModal'>
                     <h4 className='text-center loginTitle'>请登录</h4>
                    <div className='form-group row'>
                        <div className="col-sm-12 my-1">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text"><i className='icon icon-yonghu'></i></div>
                                </div>
                                <input type="text" className="form-control form-control-lg"  placeholder="Username"  ref="__loginName"/>
                            </div>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <div className="col-sm-12 my-1">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text"><i className='icon icon-mima'></i></div>
                                </div>
                                <input type="password" className="form-control form-control-lg" placeholder="Password"  ref="__loginPwd"/>
                            </div>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <div className="col-sm-12 my-1">
                            <button type="submit" className="btn btn-primary btn-lg col-sm-12" onClick={e=>this.login()}>登 录</button>
                         </div>
                         <div className="col-sm-12 my-1">
                            <button type="submit" className="btn btn-primary btn-lg col-sm-12" onClick={e=>this.register()}>注 册</button>
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}