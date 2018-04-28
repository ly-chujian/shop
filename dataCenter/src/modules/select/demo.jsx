
import React from 'react';
import SelectData from '../../core/select/select'
import CheckBox from '../../core/checkBox/checkBox'
import Radio from '../../core/Radio/radio'
import Input from '../../core/input/text'
export  class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [
                {name:'item1',id:1,ck:false},
                {name:'item2',id:2,ck:false},
                {name:'item3',id:3,ck:false},
            ],
            checkBoxData : [
                {name:'aaa',val:1,disabled:true},
                {name:'bbb',val:2,disabled:false},
                {name:'ccc',val:3,disabled:false},
            ],
            radioData : [
                {name:'aaa',val:1,disabled:true},
                {name:'bbb',val:2,disabled:false},
                {name:'ccc',val:3,disabled:false},
            ],
            msg : ''
        }
        this.getData = this.getData.bind(this);
        this.checkBoxChage = this.checkBoxChage.bind(this);
        this.getCheckBoxData = this.getCheckBoxData.bind(this);
        this.getRadioData = this.getRadioData.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.getInputVal = this.getInputVal.bind(this);
        this.btnClick = this.btnClick.bind(this);
    }
    componentWillMount(){
        
    }
    getData(){
        var res = [];
        this.state.data.map((item,index)=>{
            res.push({name:item.name,id:item.id,ck:item.ck})
        })
        return res;
    }
    
    checkBoxChage(e){
        let _val = e.target.value;
        let isCk = e.target.checked;
    }
    getCheckBoxData(){
        var res = [];
        this.state.checkBoxData.map((item,index)=>{
            res.push({name:item.name,val:item.val,disabled:item.disabled})
        })
        return res;
    }
    getRadioData(){
        var res = [];
        this.state.radioData.map((item,index)=>{
            res.push({name:item.name,val:item.val,disabled:item.disabled})
        })
        return res;
    }
    radioChange(e){
        let _val = e.target.value;
    }
    getInputVal(val){
        console.log(val)
    }
    btnClick(e){
        console.log(this.refs['input'].submit())
        console.log(this.refs['getSelect'].getTopData())
    }
    render(){
        return (
            <div>
                <SelectData getData = {this.getData} ref = 'getSelect'/>
                <CheckBox onChange = {this.checkBoxChage} checkBoxData = {this.getCheckBoxData}/>
                <Radio getRadioData = {this.getRadioData} onChange = {this.radioChange}/>
                <Input getVal = {this.getInputVal} ref = 'input' type = 'text' placeholder = '请输入内容' msg = '请输入内容' />
                <button onClick = {this.btnClick}>点击</button>
            </div>
        )
    }
}