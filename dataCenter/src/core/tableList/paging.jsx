
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
            <div className={TKCls.paging + ' pageNumCls'} >
                {/* <span>共<span>{count}</span>条</span>
                <input type="button" title="上一页" onClick={this.pprev} value="上一页" className='btn btn-sm btn-info'/>
                <input type="button" title="下一页" onClick={this.pnext} value="下一页"  className='btn btn-sm btn-info'/>
                <span>当前第<span>{index}</span>/<span>{total}</span>页</span>
                <span>到 <input type="text" ref={this.goIndexKey} className='form-control input-sm' style={{width:'100px'}}/> 页</span>
                <input type="button" value="确定" onClick={this.goIndex.bind(this)} className='btn btn-sm btn-success'/> */}
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={this.pprev}><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">共{count}条</a></li>
                        <li className="page-item"><a className="page-link" href="#">当前第</a></li>
                        <li className="page-item"><a className="page-link" href="#">{index}/{total}</a></li>
                        <li className="page-item"><a className="page-link" href="#">页</a></li>
                        <li className="page-item" onClick={this.pnext}><a className="page-link" href="#">Next</a></li>
                        <li className="page-item"><a className="page-link" href="#">到</a></li>                        
                        <li className="page-item"><input type="text" ref={this.goIndexKey} className='form-control input-sm' style={{width:'60px'}} placeholder='第几页'/></li>
                        <li className="page-item" onClick={e=>this.goIndex()} ><a className="page-link" href="#">确定</a></li>               
                    </ul>
                  
                </nav>

               </div>
        );
    }

    componetWillUnmount(){
        this.goIndexKey = null;
    }
}