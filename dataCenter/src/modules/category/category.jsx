import React from 'react';

import Util from "../../core/tools/util.jsx";

export default class Goods extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        Util.fetchAjax("/api/person/list").then(d=>{
            debugger
        })
    }

    render(){
        return (
            <div>goods</div>
        );
    }
}