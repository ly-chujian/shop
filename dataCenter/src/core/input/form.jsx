import React from 'react';

export default class VForm extends React.Component{
    constructor(props){
        super(props);

        this.instanceArray = [];
    }

    check(){
        console.log(1);
    }

    addInstance(instance){
        this.instanceArray.push(instance);
    }

    componentDidMount(){
        console.log(this.instanceArray);
    }

    render(){
        
        let children = this.props.children;

        if(Array.isArray(children)){
            children = children.map(item=>{
                return Object.assign({}, item, {props:{...item.props,addInstance:this.addInstance.bind(this)}});
            })
        }
        
        return (
            <div>
                {children}
            </div>
        )
    }
}