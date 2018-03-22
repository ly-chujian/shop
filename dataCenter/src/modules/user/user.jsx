import React from 'react';

import { Button } from 'element-react';

import 'element-theme-default';

export class User extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div><Button type="primary">Hello</Button></div>
        );
    }
}