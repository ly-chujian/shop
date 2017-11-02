import React from 'react';

export default class Textt extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            val:this.props.data,
            text:props.children.props.data
        }
    }

    componentDidMount(){
         
        this.setState({text:1111})

        var tmp = this.state.val;
        var res = tmp;
        text.data = text.data.substring(0,2)
        var sph = parseInt(this.refs['sp'].offsetHeight);
        var height = parseInt(this.props.l);
        var width = parseInt(this.props.h);

        if( height*width < sph){
            res = tmp.substring(0,(sph - (height*width)))+"...";
        }

        this.setState({val:res});
    }

    render(){
        return (
            <div>
                <div ref="sp">{this.state.val}</div>
            </div>
        );
    }
}