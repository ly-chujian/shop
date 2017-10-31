import React from 'react';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom';
import LayoutCss from '../layout/layout.css';

import { renderRoutes } from 'react-router-config';
import Util from "../../core/tools/util.jsx";

//import Goods from "../goods/goods.jsx";
//import Order from "../order/order.jsx";
//import User from "../user/user.jsx";
//import AutoTest from "../autoTest/autotest.jsx";
//import GetInput from "../getInput/getInput.jsx";

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName:""
        }
    }

    componentWillMount(){
        Util.fetchAjax("/api/login/check").then(d=>{
            if(d.rc){
                this.setState({userName:d.data.name});
                cacheCtl.set(CacheKeys.USERNAME, d.data.name);
            }else{
                this.props.history.push({pathname:"/login"});
            }
        })
    }

    logOut(){
        cacheCtl.set(CacheKeys.USERNAME,"");
        Util.fetchAjax("/api/login/logOut","post",null).then(e=>{
            this.props.history.push({pathname:"/login"});
        });
    }

    render(){
        return(
            <div className={LayoutCss.container}>
                <div className={LayoutCss.nav}>
                    <ul>
                        <li><Link to="/goods">Goods</Link></li>
                        <li><Link to="/order">Order</Link></li>
                        <li><Link to="/user">User</Link></li>
                        <li><Link to="/auto">Auto Test</Link></li>
                        <li><Link to="/getInput">getInput</Link></li>
                    </ul>
                </div>
                <div className={LayoutCss.rightBox}>
                    <div className={LayoutCss.top}>
                        <span>{this.state.userName}</span>
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