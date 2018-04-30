
import React from 'react';
import VerificationInput from '../../core/input/verification'
import VForm from '../../core/input/form'

export class User extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.refs['a']);
    }

    render(){
        return (
            <div>
                <VForm>
                    <VerificationInput ref='a' ntype="required" msg="不允许为空"></VerificationInput>
                </VForm>
            </div>
        )
    }
}