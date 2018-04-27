/**
 * Created by wupeng5 on 2017/10/31.
 */
import React from 'react';
import Loadable from 'react-loadable';
import Layout from "../modules/layout/layout.jsx";
import Loading from '../modules/loading/loading.jsx';

export default class RouterCtl{
    constructor() {
        this.allRouters = [
            {path:"/layout",comp:Layout},
            {path:"/login",comp:Loadable({ loader: () => import('../modules/login/login.jsx'), loading: () => <Loading />})},
            {path:"/auto",comp:Loadable({ loader: () => import('../modules/autoTest/autoTest.jsx'), loading: () => <Loading />})},
            {path:"/goods",comp:Loadable({ loader: () => import('../modules/goods/goods.jsx'), loading: () => <Loading />})},
            {path:"/order",comp:Loadable({ loader: () => import('../modules/order/order.jsx'), loading: () => <Loading />})},
            {path:"/select",comp:Loadable({ loader: () => import('../modules/select/demo.jsx').then(x=>x.User), loading: () => <Loading />})},
            // {path:"/user",comp:Loadable({ loader: () => import('../modules/user/user.jsx'), loading: () => <Loading />})},
        ];
    }

    getComponentsByName(name){
        var res = null;
        this.allRouters.map(item=>{
            if(item.path == name){
                res = item.comp;
            }
        })
        if(res == null){
            res = Loadable({ loader: () => import('../modules/autoTest/autoTest.jsx'), loading: () => <Loading />});
        }
        return res;
    };
}