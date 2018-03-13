import React from 'react';
import {Link,NavLink,BrowserRouter,Switch,Route,HashRouter} from 'react-router-dom';
import LoginCss from './login.css';
import { renderRoutes } from 'react-router-config';

import Util from "../../core/tools/util.jsx";
import Layout from "../layout/layout.jsx";

import "antd-mobile/dist/antd-mobile.css";

import { observer, inject } from 'mobx-react';
@inject('loginUserStore')
@observer
export default class LoginTmp extends React.Component{
    constructor(props){
        super(props);
        this.observer = this.props.loginUserStore;
    }

    login(){
        var name = this.refs['__loginName'].value;
        var pwd = this.refs['__loginPwd'].value;

        if(name != "" && pwd != ""){
            performanceTool.setStart();
            Util.fetchAjax(ModuleRequestUrl.LOGIN.login,"post",{name:name,pwd:pwd}).then(d=>{
                if(d.rc){
                    performanceTool.compare("LOGIN");
                    Util.setCookie(CookieKeys.SHOPUSERNAME,name);
                    this.observer.setUser(name);
                    this.props.history.push({pathname:"/"});
                }else{
                    alert(d.data);
                }
            })
        }
    }

    render(){
        return(
            <div className={LoginCss.bg}>
                <div className={LoginCss.container}>
                    <div className={LoginCss.item}>
                        <label>登录名：</label>
                        <input type="text" ref="__loginName" />
                    </div>

                    <div className={LoginCss.item}>
                        <label>密码：</label>
                        <input className={LoginCss.ml14} type="password" ref="__loginPwd" />
                    </div>
                    <div className={LoginCss.btn} onClick={e=>this.login()}>登录</div>
                </div>
            </div>
        )
    }
}