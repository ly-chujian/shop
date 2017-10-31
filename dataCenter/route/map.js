/**
 * Created by wupeng5 on 2017/10/31.
 */

import LoginTmp from "../modules/login/login.jsx";
import Layout from "../modules/layout/layout.jsx";
import Goods from "../modules/goods/goods.jsx";
import Order from "../modules/order/order.jsx";
import User from "../modules/user/user.jsx";
import AutoTest from "../modules/autoTest/autotest.jsx";
import GetInput from "../modules/getInput/getInput.jsx";

export default class RouterCtl{
    constructor() {
        this.allRouters = [
            {path:"/layout",comp:Layout},
            {path:"/login",comp:LoginTmp},
            {path:"/auto",comp:AutoTest},
            {path:"/goods",comp:Goods},
            {path:"/order",comp:Order},
            {path:"/user",comp:User},
            {path:"/getInput",comp:GetInput}
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
            res = AutoTest;
        }
        return res;
    };
}