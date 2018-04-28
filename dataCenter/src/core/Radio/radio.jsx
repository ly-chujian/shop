import React from 'react';

export default class Redio extends React.Component{
    constructor(props){
        super(props);
        this.radioChange = this.radioChange.bind(this);
    }
    radioChange(e){
        this.props.onChange(e);
    }
    getData(){
        let _data = this.props.getRadioData();
        let html = [];
        _data.map((item,index)=>{
            html.push(
                <div className="custom-control custom-radio custom-control-inline" key = {Math.random()}>
                    <input type="radio" id={'radio' + item.val} name= 'radioName' value = {item.val} disabled = {item.disabled} className="custom-control-input" onChange={this.radioChange}/>
                    <label className="custom-control-label" htmlFor={'radio' + item.val}>{item.name}</label>
                </div>
            )
        })
        return html;
    }
    render(){
        let getData = this.getData();
        return (
            <div>
               {getData}
            </div>
        )
    }
} 