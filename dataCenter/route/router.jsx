import React from 'react';
import {Link,NavLink,BrowserRouter,Switch,Route,HashRouter} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import RouterCtl from "./map.js";

export default class RouterConfig extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            routerItems : []
        };
        this.routerMapCtl = new RouterCtl();
    }

    componentDidMount(){
        window.setTimeout(()=>{
            this.setState({
                routerItems:[
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
                                path: "/user",
                                component: this.routerMapCtl.getComponentsByName("/user")
                            },
                            {
                                path: "/getInput",
                                component: this.routerMapCtl.getComponentsByName("/getInput")
                            },
                            {
                                component: this.routerMapCtl.getComponentsByName("/noMatch")
                            }
                        ]
                    }
                ]
            });
        },0)
    }

    render(){
        return (
            <HashRouter>
                {renderRoutes(this.state.routerItems)}
            </HashRouter>
        );

    }
}

