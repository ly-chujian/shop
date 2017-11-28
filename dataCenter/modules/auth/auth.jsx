import React from 'react';
import Util from "../../core/tools/util.jsx";
import { observer, inject } from 'mobx-react';
import { Redirect } from "react-router-dom";

@inject('loginUserStore')
@observer
export const Auth = (ComposedComponent) => class extends React.Component{
    constructor(props){
        super(props);
        this.observer = this.props.loginUserStore;
    }

    componentWillMount(){
        Util.fetchAjax("/api/login/check").then(d=>{
            if(d.rc){
                this.observer.setUser(d.data.name);
            }
        })
    }

    render(){
        var name = this.observer.getUserName();
        if(name){
            return <ComposedComponent {...this.props} auth={name} />
        }else{
            return <Redirect to='/login' />
        }
    }
}