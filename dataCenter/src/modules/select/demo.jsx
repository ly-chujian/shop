
import React from 'react';
import InputItem from '../../core/input/input.jsx';
import VForm from '../../core/input/form';

export class User extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <div>
                <VForm>
                    <InputItem ntype="required" msg="aaa不允许为空"></InputItem>
                    <InputItem ntype="required" msg="bbb不允许为空"></InputItem>
                </VForm>
            </div>
        )
    }
}