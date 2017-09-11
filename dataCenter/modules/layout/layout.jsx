import React from 'react';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom';
import LayoutCss from '../layout/layout.css';

import Goods from "../goods/goods.jsx";
import Order from "../order/order.jsx";
import User from "../user/user.jsx";

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.userName = "";
    }

    componentWillMount(){
        this.userName = cacheCtl.get(CacheKeys.USERNAME);
        if(!this.userName){
            //this.props.history.push({pathname:"/"});
        }
    }

    logOut(){
        //cachePub.set(CacheKeys.USERNAME,"");
        //this.props.history.push({pathname:"/"});
    }

    render(){
        return(
            <div className={LayoutCss.container}>
                <div className={LayoutCss.nav}>
                    <ul>
                        <li><Link to={`${this.props.match.url}/goods`}>Goods</Link></li>
                        <li><Link to={`${this.props.match.url}/order`}>Order</Link></li>
                        <li><Link to={`${this.props.match.url}/user`}>User</Link></li>
                    </ul>
                </div>
                <div className={LayoutCss.rightBox}>
                    <div className={LayoutCss.top}>
                        <span>{this.userName}</span>
                        <span className={LayoutCss.logout} onClick={e=>this.logOut()}>退出</span>
                    </div>
                    <div className={LayoutCss.box}>
                        <Switch>
                            <Route path={`${this.props.match.url}/goods`} component={Goods} />
                            <Route path={`${this.props.match.url}/order`} component={Order}/>
                            <Route path={`${this.props.match.url}/user`} component={User}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}