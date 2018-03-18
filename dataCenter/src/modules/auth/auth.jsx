import React from 'react';
import Util from "../../core/tools/util.jsx";
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

    componentWillMount(){
        Util.ajaxServer.doFetch("/api/login/check").then(d=>{
            if(d.rc){
                var _tmpName = d.data.name;
                Util.cookie.setCookie(CookieKeys.SHOPUSERNAME, _tmpName);
                this.observer.setUser(_tmpName);
            }
        })
    }

    render(){
        var name = Util.cookie.getCookie(CookieKeys.SHOPUSERNAME);
        if(name){
            // return <ComposedComponent {...this.props} auth={name} />
            return this.props.comp({name:name});
        }else{
            return <Redirect to='/login' />
        }
    }
}

// export const Auth = (Comp)=> {
//     return class extends React.Component{
//         constructor(props) {
//             super(props);
//             extendObservable(this, LoginUserStore);
//         }
//
//         render(){
//             console.log(this);
//             return (
//                 <Comp {...this.props} />
//             )
//         }
//
//     }
// }