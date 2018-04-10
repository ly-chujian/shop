import React from 'react';
import Util from "../../../core/tools/util.jsx";
// import {extendObservable} from 'mobx';
import { observer, inject } from 'mobx-react';
import { Redirect } from "react-router-dom";

// import { LoginUserStore } from "../../store/loginUser/store";

@inject('loginUserStore')
@observer
export default class Auth extends React.Component{
    constructor(props){
        super(props);
        this.observer = this.props.loginUserStore;
    }

    render(){
        let name = Util.cookie.getCookie(CookieKeys.SHOPUSERNAME);
        if(name){
            this.observer.setUser(name);
            // return <ComposedComponent {...this.props} auth={name} />
            return this.props.comp({name:name});
        }else{
            return <Redirect to='/login' />
        }
    }
}