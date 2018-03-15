import React from "react";
import Util from "../tools/util.jsx";
import Header from "./header.jsx";
import Body from "./body.jsx";
import Paging from "./paging.jsx";
import Ctrl from "./tableCtrl.jsx";
import Css from "./__tk.css";

// import Perf from 'react-addons-perf';

export default class TableList extends React.Component {
	constructor(props) {
		super(props);
        // this._Perf = Perf;

        //state管控整体数据
        this.state = {
			data:[],
			cols:this.props.options.map
		}
		//table主键，为了区多个组件在同一页面通信的key
		this.tableKey = Math.ceil(Math.random()*10000000000000000);
        //是否需要渲染标识
		this.needRender = true;
		//table接收的参数
		let option = this.props.options;
		this.pageOption = option.pageOption;
		this.analysis = option.analysis;
        this.showCk = option.showCk?true:false;
        this.checkedCb = option.scb;
        this.actions = option.actions;
        this.getUrl = option.getUrl;

        this.bodyKey = "__body__" + this.tableKey;
		this.headerKey = "__header__" + this.tableKey;
		
		this.resetCols = this.resetCols.bind(this);
	}

	shouldComponentUpdate(nextProps,nextState){
		return this.needRender;
	}

    componentDidUpdate(){
		/** Pref Performance**/
        // this._Perf.stop();
        // var measurements = this._Perf.getLastMeasurements();
        // this._Perf.printInclusive(measurements);        //打印总时间
        //Perf.printExclusive(measurements);        //打印独占时间（不包括组件挂载时间）
        // this._Perf.printWasted(measurements);             //打印浪费的时间（最有用的函数，例如render 了但是DOM没有变化）
        //Perf.printOperations(measurements);       //打印浪费的时间（最有用的函数，例如render 了但是DOM没有变化）
		/** Pref Performance**/
    }

	componentDidMount(){
		this.getData();
	}

	//重新set head map, 数据不重新请求
	resetCols(map){
		this.setState({cols:map});
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

	//加入判断,获取body组件
	getBodyComp(){
		if(this.state.data.length == 0){
			return <div>data is null</div>
		}else{
			return <Body ref={this.bodyKey} actions={this.actions} data={this.state.data} cols={this.state.cols} ckcb={this.bodyCallback} showCk={this.option.showCk} />;
		}
	}
	//加入判断,获取分页组件
	getPagingComp(){
        if(this.state.data.length == 0){
        	return <div>data is null</div>
		}else{
        	return <Paging goNext={this.next} goPrev={this.prev} goIndex={this.goIndex.bind(this)} options={this.pageOption} />
		}
	}

	//加入判断，获取head组件
	getHeaderComp(){
        if(!this.state.cols || this.state.cols instanceof Array == false || this.state.cols.length == 0){
			return <div>Map parameter must be Array</div>
		}else{
			return <Header resetColsCb={this.resetCols} bk={this.bodyKey} hk={this.headerKey} ref={this.headerKey} actions={this.actions} cols={this.state.cols} ckcb={this.checkedCb} showCk={this.showCk} />;
		}
	}

	render() {
		return (
            <div className={Css.panel_table + " text-center"}>
                <div className={Css.overflow_table}>
                    <table>
						{this.getHeaderComp()}
                        {/* {this.getBodyComp()} */}
                    </table>
                </div>
				{/* {this.getPagingComp()} */}
            </div>
		);
	}
}