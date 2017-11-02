import React from 'react';
import Textt from "./text.jsx";

export default class Goods extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Textt l="2" h="4" data = "abcxxxabcxxxabcxxx"></Textt>
            </div>
        );
    }
}