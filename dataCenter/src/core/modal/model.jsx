

import React from "react";
import ReactDom from 'react-dom';

export default class Modal extends React.Component{
    constructor(props){
        super(props);
        this.el = document.createElement("div");
        this.el.setAttribute("class","modal");
    }

    componentDidMount(){
        document.body.appendChild(this.el);
    }

    componentWillUnmount(){
        document.body.removeChild(this.el);
    }

    render(){
        return ReactDom.createPortal(
            this.props.children,
            this.el
        );
    }
}