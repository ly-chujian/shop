import React from 'react';

export default class Input extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            msg : '',
            val : ''
        }
    }
    onChange(e){
       // this.props.getVal(e.target.value);
        if(e.target.value){
           this.setState({
                 msg : '',
                 val : e.target.value
           })
        }else{
            this.setState({
                msg : this.props.msg,
                val : e.target.value
          })
        }
    }
    submit(){
        if(this.state.val){
            this.setState({
                msg : '',
          })
        }else{
            this.setState({
                msg : this.props.msg
          })
        }
        return this.state.val;
    }
    render(){
        return (
            <div>
                <input className="form-control" type={this.props.type} value ={this.state.val} placeholder={this.props.placeholder} onChange = {this.onChange}/>
                <p className="text-left">{this.state.msg}</p>
            </div>
        )
    }
}