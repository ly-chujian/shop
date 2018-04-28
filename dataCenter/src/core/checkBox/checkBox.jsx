import React from 'react';

export default class CheckBox extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){
        this.props.onChange(e);
    }

    getData(){
        let _data = this.props.checkBoxData();
        let html = [];
        _data.map((item,index)=>{
            html.push(
                <div className="custom-control custom-checkbox custom-control-inline" key={Math.random()}>
                    <input type="checkbox" className="custom-control-input" id={'check' + item.val} value = {item.val} disabled = {item.disabled} onChange = {this.onChange} />
                    <label className="custom-control-label" htmlFor={'check' + item.val}>{item.name}</label>
                </div>
            )
        })
        return html;
    }

    render(){
        let getData = this.getData();
        return(
            <div>
                {getData}
                {/* <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" value = '123' disabled = {this.props.disabled} onChange = {this.onChange} />
                    <label className="custom-control-label" htmlFor="customCheck1">Check this custom checkbox</label>
                </div> */}
            </div>
        )
    }
}