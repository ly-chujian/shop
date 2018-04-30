import React from 'react';
import {HOCInput} from './HOCInput';

class InputItem extends React.Component{
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
        if(val){
            this.setState({errorInfo:this.props.msg,value:val});
        }
    }

    check(){
        return this.state.errorInfo;
    }

    render(){
        return (
            <div>
                <input className="form-control" type="text" value={this.state.value} onChange = {this.onChange}/>
            </div>
        )
    }
}

export default HOCInput(InputItem)