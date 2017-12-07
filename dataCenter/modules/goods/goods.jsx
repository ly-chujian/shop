import React from 'react';
import Iframe from "../../core/iframe/iframe.jsx";

export default class Goods extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let iframe = '<iframe src="https://www.lenovo.com.cn" width="540" height="450"></iframe>';
        return (
            <div>
                <Iframe iframe={iframe} />
            </div>
        );
    }
}