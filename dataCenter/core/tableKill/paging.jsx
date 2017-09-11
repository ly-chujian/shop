
import React from "react";
export default class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillMount(){
        console.log("paging componentWillMount");
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.options);
    }

    componentDidMount(){
        console.log("paging componentDidMount");
        console.log("*****************tableKill end work*****************");
    }

    render() {
        console.log("paging render function");
        var that = this;
        var count = this.props.options.count;
        var index = this.props.options.index;
        var total = this.props.options.total;
        return (
            <div className="pull-right bot">
                总条数:<span className="red">{count}</span>
                <button className="btn btn-info btn-xs" type="button" onClick={this.prev}>上一页</button>
                <button className="btn btn-info btn-xs" type="button" onClick={this.next}>下一页</button>
                当前页<span className="red">{index}</span>/<span className="red">{total}</span>
                到<input className="input" type="text" ref="__pIndex" />页
                <button className="btn btn-info btn-xs" type="button" onClick={that.goIndex.bind(this)}>确定</button>
            </div>
        );
    }
    goIndex(){
        this.props.goIndex(this.refs['__pIndex'].value);
    }
    prev(){
        this.props.goPrev();
    }
    next(){
        this.props.goNext();
    }
}