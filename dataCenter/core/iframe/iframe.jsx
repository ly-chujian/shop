
import React from 'react';
export default class Iframe extends React.Component{
    constructor(props){
        super(props);
        this.iframe = this.iframe.bind(this);
    }

    iframe(){
        return {__html: this.props.iframe};
    }

    render() {
        var res = this.iframe();
        return (
            <div>
                <div dangerouslySetInnerHTML={ this.iframe() } />
            </div>
        );
    }
}
