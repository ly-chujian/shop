
import React from 'react';

export const HOCInput = (Comp)=> {
    return class extends React.Component{
        constructor(props) {
            super(props);
            this.instance = null;
        }

        componentDidMount(){
            this.props.addInstance(this.instance);
        }

        render(){
            return (
                <Comp {...this.props} ref={instance=>this.instance = instance}/>
            )
        }
    }
}