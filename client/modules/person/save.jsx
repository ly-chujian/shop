
import React from "react";
import Util from '../../core/tools/util.jsx';
import personEnum from "../../services/personEnum.jsx";

export default class PersonSave extends React.Component{
    constructor(props){
        super(props);
        this.showSaveBtn = "block";

        this.state = {name:"",age:"",ageData:cacheCtl.get(CacheKeys.PERSONAGE),address:"",flag:this.props.match.params.tag};

        this.bindData = this.bindData.bind(this);
    }

    componentWillMount(){
        var that = this;
        //获取age下拉框数据
        if(!this.state.ageData){
            personEnum.getAge(d=>{
                that.setState({ageData:d});
            })
        }
        //按钮是否显示
        this.flag = this.props.match.params.tag;
        if(this.flag == "add"){
            this.showSaveBtn = "block";
        }
        else if(this.flag == "edit"){
            this.showSaveBtn = "block";
            this.bindData();
        }else{
            this.showSaveBtn = "none";
        }
    }

    bindData(){
        var that = this;
        Util.fetchAjax("/api/person/getPersonById/"+this.props.match.params.id,"get").then(d=>{
            if(d.rc){
                that.setState({name: d.data.name,age: d.data.age,address: d.data.address});
            }
        })
    }

    save(){
        var that = this;
        var params = {
            name:this.state.name,
            age:this.state.age,
            address:this.state.address
        };
        var url = "";
        if(this.state.flag == "add"){
            url = "/api/person/add";
        }else{
            params.id = this.props.match.params.id;
            url = "/api/person/edit";
        }
        Util.fetchAjax(url,"post",params).then(d=>{
            if(d.rc){
                alert("保存成功!");
                that.goList();
            }
        })
    }

    changeAge(){

    }

    render(){
        return (
            <div>
                <div>title:person save</div>
                <div>name:<input type="text" value={this.state.name} onChange={e=>this.setState({name: e.target.value})} /></div>
                <div>age:<select value={this.state.age} onChange={e=>this.setState({age:e.target.value})}>{this.appendSelect(this.state.ageData)}</select></div>
                <div>address:<input type="text" value={this.state.address} onChange={e=>this.setState({address: e.target.value})} /></div>
                <div>
                    <input style={{display:this.showSaveBtn}} type="button" onClick={this.save.bind(this)} value="保存"/>
                    <input type="button" value="返回上一级" onClick={this.goList.bind(this)} />
                </div>
            </div>
        );
    }

    goList(){
        this.props.history.push({pathname:"/person"});
    }

    appendSelect(data){
        var tmp = [];
        if(!data){
            return tmp;
        }
        data.map(item=>{
            tmp.push(<option key={Math.random()} value={item.code}>{item.name}</option>);
        })
        return tmp;
    }
}