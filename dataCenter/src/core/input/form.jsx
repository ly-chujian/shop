import React from 'react';

export default class VForm extends React.Component{
    constructor(props){
        super(props);
    }

    check(){
        
    }

    componentDidMount(){
        let children = this.props.children;
    }

    render(){
        console.log(this.props.children);
        return (
            <div>
                {/* {this.props.children} */}
            </div>
        )
    }
}