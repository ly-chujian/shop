import React from 'react';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom';
import LayoutCss from './layout.css';

import { renderRoutes } from 'react-router-config';
import Util from "../../core/tools/util.jsx";

import Auth from "../HOC/auth/auth.jsx";

import { observer, inject } from 'mobx-react';
@inject('loginUserStore')
@observer
class Layout extends React.Component{
    constructor(props){
        super(props);
        this.observer = this.props.loginUserStore;
    }

    logOut(){
        Util.ajaxServer.doFetch(ModuleRequestUrl.LOGIN.logout,"post",null).then(e=>{
            //防止用户点击返回按钮，依然记录当前userName,所以需要清空
            this.observer.setUser("");
            this.props.history.push({pathname:"/login"});
            Util.cookie.removeCookie(CookieKeys.SHOPUSERNAME);
        });
    }

    render(){
        return(
            <div className={LayoutCss.container}>
            <div className="row">
                <div  className="col-4">
                    <ul  className="list-group" id="list-tab" role="tablist">
                        <li className="list-group-item list-group-item-action active" ><Link to="/goods">Goods</Link></li>
                        <li className="list-group-item list-group-item-action"><Link to="/order">Order</Link></li>
                        <li className="list-group-item list-group-item-action"><Link to="/login">去登录</Link></li>
                        <li className="list-group-item list-group-item-action"><Link to="/select">select</Link></li>
                        <li className="list-group-item list-group-item-action"><Link to="/auto">Auto Test</Link></li>
                    </ul>
                </div>
                <div className="col-8">
                    <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
                    <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                    <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                    <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                    </div>
                </div>
            </div>
                <div className={LayoutCss.rightBox}>
                    <div className={LayoutCss.top}>
                        <span>{this.observer.user.name}</span>
                        <span className={LayoutCss.logout} onClick={e=>this.logOut()}>退出</span>
                    </div>
                    {renderRoutes(this.props.route.routes)}
                    {/*<div className={LayoutCss.box}>
                        <Switch>
                            <Route path={`${this.props.match.url}/goods`} component={Goods} />
                            <Route path={`${this.props.match.url}/order`} component={Order}/>
                            <Route path={`${this.props.match.url}/user`} component={User}/>
                            <Route path={`${this.props.match.url}/auto`} component={AutoTest}/>
                            <Route path={`${this.props.match.url}/getInput`} component={GetInput}/>
                        </Switch>
                    </div>*/}
                </div>
            </div>
        )
    }
}
//export default Layout;
export default class extends React.Component{
    render(){
        return (
            <Auth comp={(code)=><Layout { ...this.props} user={code} />}></Auth>
        );
    }
}