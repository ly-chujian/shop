
import React from 'react';
import VInput from '../../core/input/input.jsx';
import VForm from '../../core/input/form';

class User extends React.Component{
    constructor(props){
        super(props);
    }

    submitForm(){
        console.log(this.props.onVerification());
    }

    render(){
        return (
            <div>
                Name:<input type="text"/>
                <button>Search</button>
                <VForm>
                    Name:{this.props.addInstance("NAME",<VInput require ntype="phone" msg="name不允许为空"></VInput>)}
                    Age:{this.props.addInstance("AGE",<VInput require ntype="email" msg="age不允许为空"></VInput>)}
                    Other:<VInput ntype="required" msg="bbb不允许为空"></VInput>
                </VForm>
                <button onClick={this.submitForm.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default VForm.setCreate(User)