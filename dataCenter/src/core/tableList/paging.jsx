
import React from "react";
import TKCls from "./__tk.css";
import Util from "../tools/util.jsx";

export default class Paging extends React.Component {
    constructor(props) {
        super(props);

        this.goIndex = this.goIndex.bind(this);
        this.pprev = this.pprev.bind(this);
        this.pnext = this.pnext.bind(this);
        this.goIndexKey = Math.ceil(Math.random()*100000000);
    }

    shouldComponentUpdate(nextProps,nextState){
        let res = Util.object.equalsObject(this.props.options,nextProps.options);
        return !res;
        return true;
    }

    componentWillReceiveProps(nextProps){
        this.setState({options:nextProps.options});
    }

    pprev(){
        this.props.goPrev();
    }
    pnext(){
        this.props.goNext();
    }

    goIndex(){
        this.props.goIndex(this.refs[this.goIndexKey].value);
    }

    render() {
		console.log("%c render paging","color:green");
        let index = this.props.options.index;
        let count = this.props.options.count;
        let total = this.props.options.total;
        return (
            <div className={TKCls.paging + " text-right"}>
                <span>共<em>{count}</em>条</span>
                <input type="button" title="上一页" onClick={this.pprev} value="<" />
                <input type="button" title="下一页" onClick={this.pnext} value=">" />
                <span>当前第<em>{index}</em>/<em>{total}</em>页</span>
                <span>到 <input type="text" ref={this.goIndexKey} /> 页</span>
                <input type="button" value="确定" onClick={this.goIndex.bind(this)}/>
            </div>
        );
    }

    componetWillUnmount(){
        this.goIndexKey = null;
    }
}