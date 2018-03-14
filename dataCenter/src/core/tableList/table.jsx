import React from "react";
import Util from "../tools/util.jsx";
import Header from "./header.jsx";
import Body from "./body.jsx";
import Paging from "./paging.jsx";
import Ctrl from "./tableCtrl.jsx";
import Css from "./__tk.css";

import Perf from 'react-addons-perf';

export default class TK extends React.Component {
	constructor(props) {
		super(props);
        this._Perf = Perf;

        //state管控整体数据
        this.state = {
        	data:[]
		}
		//table主键，为了区多个组件在同一页面通信的key
		this.tableKey = Math.ceil(Math.random()*10000000000000000);
        //是否需要渲染标识
		this.needRender = true;
		//table接收的参数
		this.pageOption = this.props.options.pageOption;
		this.analysis = this.props.options.analysis;
        this.map = this.props.options.map;
        this.showCk = this.props.options.showCk?true:false;
        this.scb = this.props.options.scb;
        this.actions = this.props.options.actions;
        this.getUrl = this.props.options.getUrl;
	}

	shouldComponentUpdate(nextProps,nextState){
		return this.needRender;
	}

	componentWillMount(){

	}

    componentDidUpdate(){
		/** Pref Performance**/
        this._Perf.stop();
        var measurements = this._Perf.getLastMeasurements();
        this._Perf.printInclusive(measurements);        //打印总时间
        //Perf.printExclusive(measurements);        //打印独占时间（不包括组件挂载时间）
        this._Perf.printWasted(measurements);             //打印浪费的时间（最有用的函数，例如render 了但是DOM没有变化）
        //Perf.printOperations(measurements);       //打印浪费的时间（最有用的函数，例如render 了但是DOM没有变化）
		/** Pref Performance**/
    }

	componentDidMount(){

	}

	//获取数据
	getData(){
	    let url = this.getUrl();
	    if( url === ""){
	        return;
        }
        let suffix = url.indexOf('?') === -1?"?":"&";
	    url += suffix + this.pageOption.indexKey + "=" + this.pageOption.index + "&"+this.pageOption.sizeKey + "=" + this.pageOption.size;
	    Util.doFetch(url,"get",null).then(data=>{
            let res = this.analysis(data);
            if(res.data && res.data instanceof Array && res.data.length != 0){
                let arr = Util.addPrimaryAndCk(res.data);
                this.setState({data:arr});
            }else{
                console.log("检查analysis, getUrl参数!");
            }
        })
	}

	//开启和关闭table渲染
	stopRender(){
	    this.needRender = false;
    }
	startRender(){
        this.needRender = true;
	}

	render() {

	}
}