
import React from 'react';
import SelectData from '../../core/select/select'
export  class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [
                {name:'item1',id:1,ck:false},
                {name:'item2',id:2,ck:false},
                {name:'item3',id:3,ck:false},
            ]
        }
        this.getData = this.getData.bind(this);
    }
    getData(){
        var res = [];
        this.state.data.map((item,index)=>{
            res.push({name:item.name,id:item.id,ck:item.ck})
        })
        return res;
    }
    componentWillMount(){
        
    }
    render(){
        return (
            <div>
                <SelectData getData = {this.getData}/>
            </div>
        )
    }
}