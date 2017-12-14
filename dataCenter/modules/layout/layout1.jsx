import React from 'react';

export default class Base extends React.Component{
    constructor(props){
        super(props);
        this.observer = this.props.loginUserStore;
    }

    render(){
        //this -->Person
        return(
            <div>
            </div>
        )
    }
}

//
export default class Person extends Base{
    constructor(props){
        super(props);
    }

    render(){
        let base = Base.prototype.render.call(this);

        return <h1>{base}</h1>;
    }
}