
import React from "react";
import TKCls from "./__tk.css";
import Util from "../tools/util.jsx";

export default class Paging extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }

    shouldComponentUpdate(nextProps,nextState){
        var res = Util.equalsObject(this.props.options,nextProps.options);
        return !res;
    }

    componentWillReceiveProps(nextProps){

    }

    componentDidMount(){

    }

    render() {
        console.log("paging render function");
        var that = this;
        var count = this.props.options.count;
        var index = this.props.options.index;
        var total = this.props.options.total;
        return (
            <div className={TKCls.paging + " text-right"}>
                <span>共<em>{count}</em>条</span>
                <input type="button" title="上一页" onClick={this.prev} value="<" />
                <input type="button" title="下一页" onClick={this.next} value=">" />
                <span>当前第<em>{index}</em>/<em>{total}</em>页</span>
                <span>到 <input type="text" ref="__pIndex"/> 页</span>
                <input type="button" value="确定" onClick={that.goIndex.bind(this)}/>
            </div>
        );
    }
}