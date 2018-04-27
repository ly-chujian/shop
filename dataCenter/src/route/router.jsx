import React from 'react';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Loadable from 'react-loadable';

import RouterCtl from "./map.js";

export default class RouterConfig extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            routerItems : []
        };
        this.routerMapCtl = new RouterCtl();
        this.getRouterByData = this.getRouterByData.bind(this);
    }

    getRouterByData(data){
        //ajax请求返回菜单数据,然后进行数据的二次解析，组装成数组
        return [
            {
                path: '/login',
                exact: true,
                component: this.routerMapCtl.getComponentsByName("/login")
            },
            {
                component: this.routerMapCtl.getComponentsByName("/layout"),
                routes: [
                    {
                        path: "/auto",
                        exact: true,
                        component: this.routerMapCtl.getComponentsByName("/auto")
                    },
                    {
                        path: "/goods",
                        component: this.routerMapCtl.getComponentsByName("/goods")
                    },
                    {
                        path: "/order",
                        component: this.routerMapCtl.getComponentsByName("/order")
                    },
                    {
                        path: "/select",
                        component: this.routerMapCtl.getComponentsByName("/select")
                    },
                    {
                        component: this.routerMapCtl.getComponentsByName("/noMatch")
                    }
                ]
            }
        ]
    }

    componentDidMount(){
        window.setTimeout(()=>{
            var data = {};
            this.setState({
                routerItems:this.getRouterByData(data)
            });
        },0)
    }

    render(){
        return (
            <BrowserRouter>
                {renderRoutes(this.state.routerItems)}
            </BrowserRouter>
        );

    }
}

