import React from "react";
import Util from "../tools/util.jsx";
import Header from "./header.jsx";
import Body from "./body.jsx";
import Paging from "./paging.jsx";
import Css from "./__tk.css";

import Perf from 'react-addons-perf';

export default class TK extends React.Component {
	constructor(props) {
		super(props);
		this.state = {arr: [],cols:[],options:{index:1,size:10,total:0,count:0}};
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.checkCols = this.checkCols.bind(this);
		this.bodyCallback = this.bodyCallback.bind(this);
		this.headCallback = this.headCallback.bind(this);
		this.getData = this.getData.bind(this);
		this.search = this.search.bind(this);

		this.option = this.props.option;
		this.option.showCk = this.option.showCk ==undefined? false:true;

        this._Perf = Perf;
	}

	shouldComponentUpdate(nextProps,nextState){
        console.log("TK是否重新渲染,",nextProps.option.isReRender);
		if(nextProps.option.isReRender == undefined){
			return true;
		}
		return nextProps.option.isReRender;
	}

	componentWillMount(){
		console.log("table componentWillMount readySendAjax");
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
		console.log("table componentDidMount");
        this.getData();
	}

	getData(){
		var that = this;
		var url = this.option.getUrl();
		if(url == ""){
			return;
		}
		var pOptions = this.option.pageOption;
		if(url.indexOf('?') == -1){
			url = url + "?";
		}else{
			url = url + "&";
		}
		var tmpUrl = url + pOptions.indexKey+"="+that.state.options.index+"&"+pOptions.sizeKey+"="+that.state.options.size;

		Util.fetchAjax(tmpUrl,"get",null).then(data=>{
			var res = this.option.analysis(data);
			if(res.data && res.data instanceof Array && res.length != 0){
				console.log("ajax 重新render");
				var arr = Util.addPrimaryAndCk(res.data);
				if(arr && arr.length != 0){
					this.setState({arr:Util.cloneObj(arr),options:{index:this.state.options.index,size:this.state.options.size,total:res.total,count:res.count}});
				}
			}else{
				console.log("检查analysis函数是否返回规定格式数据，或者数据源为空!");
			}
		});
	}

	search(current){
        this._Perf.start();
		if(!current){
			this.state.options.index = 1;
		}
		this.refs['__body'].setCkAll(false);
		this.refs['__header'].setCkAllStatus(false);
		this.getData();
	}

	next(){
		this.state.options.index += 1;
		this.refs['__body'].setCkAll(false);
		this.refs['__header'].setCkAllStatus(false);
		this.getData();
	}
	prev(){
		this.state.options.index -= 1;
		this.refs['__body'].setCkAll(false);
		this.refs['__header'].setCkAllStatus(false);
		this.getData();
	}
	goIndex(index){
		this.state.options.index = index;
		this.refs['__body'].setCkAll(false);
		this.refs['__header'].setCkAllStatus(false);
		this.getData();
	}

	checkCols(data){
		var maps = this.option.map;
		var tmp = data[0];
		var res = {cols:[],errorCols:[]};
		if(!tmp){
			return res;
		}
		maps.map(item=>{
			if(tmp.hasOwnProperty([item.key])){
				res.cols.push(item);
			}else{
				res.errorCols.push(item);
			}
		})
		return res;
	}

	bodyCallback(ids){
		if(this.option.scb){
			this.option.scb(Util.getArrayByTmpIds(ids,this.state.arr));
		}
	}

	headCallback(flag){
		var res = [];
		if(flag){
			res = this.state.arr;
		}
		if(this.option.scb){
			this.option.scb(res);
		}
	}

	render() {
		console.log("table render function");
		var tmp = this.checkCols(this.state.arr);
		var cols = tmp.cols;
		console.log("*****************tableKill begin work*****************");
		console.log("tableKill error cols is :", tmp.errorCols);
		console.log("tableKill load and current index is ",this.state.options.index);

		//没有数据源的情况下，停止渲染
		if(this.option.getUrl() == ""){
			return <div>Ajax URL Not Found</div>;
		}

		var actionArray = [];
		if(this.option.actions){
			actionArray = this.option.actions;
		}
		if(cols != null && cols.length != 0){
			return (
				<div className={Css.panel_table + " text-center"}>
					<div className={Css.overflow_table}>
						<table>
							<Header ref="__header" actions={actionArray} cols={cols} ckcb={this.headCallback} showCk={this.option.showCk} />
							<Body ref="__body" actions={actionArray} data={this.state.arr} cols={cols} ckcb={this.bodyCallback} showCk={this.option.showCk} />
						</table>
					</div>
					<Paging goNext={this.next} goPrev={this.prev} options={this.state.options} goIndex={this.goIndex.bind(this)} />
				</div>
			);
		}else{
			return (
				<div></div>
			);
		}
	}
}