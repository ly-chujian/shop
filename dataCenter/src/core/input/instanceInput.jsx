
import React from 'react';

export const InstanceInput = (Comp)=> {
    return class extends React.Component{
        constructor(props) {
            super(props);
            this.state = { error: null, errorInfo: null };
        }

        proc(compInstance) {
            // compInstance.getData();
        }

        render(){
            // debugger
            const props = Object.assign({}, this.props, {ref: this.proc.bind(this)});
            // const data = this.getData();
            return (
                <Comp {...props} />
            )
        }
    }
}