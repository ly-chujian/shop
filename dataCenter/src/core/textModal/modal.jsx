import React from 'react';

export default class Modal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={this.props.alertCls + ' alert' } role="alert">
                {this.props.alertText}
          </div>
        )
    }
}