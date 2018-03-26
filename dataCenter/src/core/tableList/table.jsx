import React from "react";
import Util from "../tools/util.jsx";
import Header from "./header.jsx";
import Body from "./body.jsx";
import Paging from "./paging.jsx";
import Css from "./__tk.css";

// import Perf from 'react-addons-perf';

export default class TableList extends React.Component {
	constructor(props) {
		super(props);
        // this._Perf = Perf;

        //state管控整体数据
        this.state = {
			data:[],
			cols:this.props.options.map,
			ck:false,
			pageOption:{
				index:this.props.options.pageOption.index?this.props.options.pageOption.index:1,
				size:this.props.options.pageOption.size?this.props.options.pageOption.size:10,
				count:0,
				total:0
			}
		}
		//table接收的参数
		this.option = this.props.options;
		this.analysis = this.option.analysis;
        this.showCk = this.option.showCk?true:false;
        this.actions = this.option.actions;
        this.getUrl = this.option.getUrl;
		
		this.noticeChangeCols = this.noticeChangeCols.bind(this);
		this.accpetHBNotice = this.accpetHBNotice.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
		this.getCheckedItems = this.getCheckedItems.bind(this);
		
		this.originCols = Util.object.cloneObj(this.props.options.map);
	}

	componentDidMount(){
		this.getData(this.state.pageOption.index);
	}
	//获取数据
	getData(index){
		if(!index){
			index = 1;
		}
	    let url = this.getUrl();
	    if( url === ""){
	        return;
        }
		let suffix = url.indexOf('?') === -1?"?":"&";
		let size = this.state.pageOption.size;
	    url += suffix + this.option.pageOption.indexKey + "=" + index + "&"+ this.option.pageOption.sizeKey + "=" + size;
	    Util.ajaxServer.doFetch(url,"get",null).then(data=>{
            let res = this.analysis(data);
            if(res.data && res.data instanceof Array && res.data.length != 0){
				let arr = Util.arrayServer.addPrimaryAndCk(res.data);
				let total = -1;
				if(parseInt(res.count)%size == 0){
					total = parseInt(res.count)/size;
				}else{
					total = parseInt(parseInt(res.count)/size) + 1;
				}
                this.setState({data:arr,pageOption:{index:index,count:arr.length,total:total,size:size}});
            }else{
                console.log("检查analysis, getUrl, pageOption参数!");
            }
        })
	}

	getCheckedItems(){
		if(this.state.data && this.state.data instanceof Array){
			return this.state.data.filter(function(item,index,array){
				return item.ck;
			})
		}
		return [];
	}

	getParams(){
		return {index:this.state.pageOption.index,data:this.state.data};
	}

	//flag不存在，默认从第一页开始搜索，flag存在，从index开始搜索
	search(flag){
		if(!flag){
			this.getData();
		}else{
			this.getData(this.state.pageOption.index);
		}
	}

	//重新set head map, 数据不重新请求
	noticeChangeCols(map){
		this.setState({cols:map});
	}

	accpetHBNotice(hData,bData){
		//如果data有参数，说明是从head过来的通知，如果没有就说明是body过来的通知
		if(hData){
			this.state.data.map(item=>{
				item.ck = hData.ck;
			})
			this.setState({data:this.state.data,ck:hData.ck});
		}
		if(bData){
			let items = Util.arrayServer.getCheckedItems(bData.data,"__tmpId");
			let flag = items.items.length == this.state.data.length?true:false;
			this.setState({data:bData.data,ck:flag});
		}
	}

	next(){
		if(this.state.pageOption.index >= this.state.pageOption.count){
			return;
		}
		let index = this.state.pageOption.index;
		index++;
		this.getData(index);
	}
	prev(){
		if(this.state.pageOption.index <=1){
			return;
		}
		let index = this.state.pageOption.index;
		index--;
		this.getData(index);
	}
	goToIndex(index){
		this.getData(index);
	}

	//加入判断,获取body组件
	getBodyComp(){
		if(this.state.data.length == 0){
			return <tbody><tr><td> data is null </td></tr></tbody>
		}else{
			return <Body actions={this.actions} data={this.state.data} cols={this.state.cols} accpetHBNotice={this.accpetHBNotice} showCk={this.showCk} />;
		}
	}
	//加入判断,获取分页组件
	getPagingComp(){
        if(this.state.data.length == 0){
        	return <div>data is null</div>
		}else{
        	return <Paging goNext={this.next} goPrev={this.prev} goIndex={this.goToIndex} options={this.state.pageOption} />
		}
	}

	//加入判断，获取head组件
	getHeaderComp(){
        if(!this.state.cols || this.state.cols instanceof Array == false || this.state.cols.length == 0){
			return <thead><tr><td> data is null </td></tr></thead>;
		}else{
			return <Header originCols={this.originCols} accpetHBNotice={this.accpetHBNotice} noticeChangeCols={this.noticeChangeCols} ck={this.state.ck} actions={this.actions} cols={this.state.cols} showCk={this.showCk} />;
		}
	}

	render() {
		return (
            <div className={Css.panel_table + " text-center"}>
                <div className={Css.overflow_table}>
                    <table>
						{this.getHeaderComp()}
						{this.getBodyComp()}
                    </table>
                </div>
				{this.getPagingComp()}
            </div>
		);
	}
}