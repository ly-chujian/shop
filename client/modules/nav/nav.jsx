
import React from "react";
import {Link,BrowserRouter,Switch,Route,HashRouter} from 'react-router-dom';

import Person from '../person/person.jsx';
import PersonSave from "../person/save.jsx";
import Others from "../other/other.jsx";
import NoMatch from "../noMathch/noMatch.jsx";

let menus = ["Home","Person","Others"];

export default class Nav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var lis = [];
        menus.map(function(item){
            if(item.toLowerCase()== "home"){
                lis.push(<li key={Math.random()}><Link to={'/'}>Home</Link></li>);
            }else{
                lis.push(<li key={Math.random()}><Link to={'/'+item.toLowerCase()}>{item.toLowerCase()}</Link></li>);
            }
        })

        return (
            <BrowserRouter>
                <div>
                    <ul>
                        {lis}
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Person} />
                        <Route path="/person" component={Person}/>
                        <Route path="/personSave/:tag/:id" component={PersonSave} />
                        <Route path="/others" component={Others} />
                        <Route path="*" component={NoMatch}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }

}