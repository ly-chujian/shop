import React from 'react';

export default class VInput extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            status:!this.props.require,
            msg:this.props.msg,
            value:''
        }
        this.ntype = this.props.vtype;
        this.el = null;
    }
    
    onChange(e){
        let val = e.target.value;
        if(!val){
            this.setState({status:false,msg:this.props.msg,value:val});
        }else{
            this.setState({status:true,msg:"",value:val});
        }
    }

    check(){
        return {...this.state};
    }

    render(){
        return (
            <div>
                <input className="form-control" type="text" value={this.state.value} onChange = {e=>{this.onChange(e)}}/>
            </div>
        )
    }
}
