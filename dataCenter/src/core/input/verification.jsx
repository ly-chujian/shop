import React from 'react';
import {InstanceInput} from './instanceInput.jsx';

export default class VerificationInput extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            errorInfo : '',
            value:''
        }
        this.ntype = this.props.vtype;
        this.el = null;
    }
    onChange(e){
        let val = e.target.value;
        if(!val){
            this.setState({errorInfo:this.props.msg,value:val});
        }
    }

    check(){
        return this.state.errorInfo;
    }

    render(){
        return (
            <div>
                <input ref={el=>this.el = el} className="form-control" type="text" value ={this.state.value} onChange = {this.onChange}/>
            </div>
        )
    }
}

// export default InstanceInput(VerificationInput)