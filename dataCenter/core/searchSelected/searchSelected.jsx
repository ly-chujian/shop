
//import './searchSelected.css';
import Util from "../util.jsx";

export default class SearchSelected extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:[],searchValue:"",showContainer:"none"};
        this.getData = this.getData.bind(this);
        this.fill = this.fill.bind(this);
        this.origin = [];
        this.filterData = this.filterData.bind(this);
        this.getSelectedItems =this.getSelectedItems.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    filterData(val){
        var res = [];
        this.origin.map(function(item){
            if(item.name.indexOf(val) != -1){
                res.push(item);
            }
        })
        return res;
    }

    componentDidMount(){
        var that=  this;
        this.getData();
    }

    getSelectedItems(){
        var ids = [];
        this.state.data.map(item=>{
            if(item.ck){
                ids.push(item.__selected_code);
            }
        })
        return Util.getItemsByFieldValues("code",ids,this.state.data);
    }

    getData(){
        var that = this;
        var url = this.props.url;
        Util.fetchAjax(url,"get",null).then(data=>{
            var res = that.props.analysis(data.data);
            res = Util.dealData(res);
            if(res && res.length != 0){
                that.origin = Util.cloneObj(res);
                that.setState({data:Util.cloneObj(res)});
            }
        })
    }

    //restoreChecked(){
    //    var that = this;
    //    var val = this.refs['__searchSelectedInput'].value;
    //    var names = val.split(',');
    //    names.map(function(name){
    //        $(that.refs['__searchSelectedTable']).find("input[type=checkbox][data-name="+name+"]").get(0).checked = true;
    //    })
    //}

    changeCk(item){
        item.ck = !item.ck;
        this.setState({data:this.state.data});
    }

    fill(){
        var data = this.state.data;
        var res = [];
        if(data.length == 0){
            res.push(<tr key={Math.random()} style={{lineHeight: '24px'}}><td>暂无数据</td></tr>);
        }else{
            data.map(item=>{
                res.push(<tr key={Math.random()} style={{lineHeight: '24px'}}><td><input type="checkbox" checked={item.ck} onChange={this.changeCk.bind(this,item)} id={item.__selected_code} data-name={item.name} /></td><td>{item.__selected_name}</td></tr>);
            });
        }
        return res;
    }

    save(){
        var items = this.getSelectedItems();
        var res = Util.getFieldVals("name",items);
        this.props.cb(items);
        this.setState({data:this.origin,searchValue:res.join(','),showContainer:"none"});
    }

    cancel(){
        this.setState({data:this.origin,searchValue:"",showContainer:"none"});
    }

    clickSearch(e){
        var val = e.target.value;
        this.setState({showContainer:"block"});
    }

    changeSearch(e){
        var val = e.target.value;
        this.setState({data:this.filterData(val),searchValue:val,showContainer:"block"});
    }

    render() {
        var res = this.fill();
        return (
            <div className="selectSearch">
                <div style={{position: 'relative',width: '200px'}}>
                    <input type="text" className="inputSel" value={this.state.searchValue} onClick={this.clickSearch.bind(this)} onChange={this.changeSearch.bind(this)} />
                    <div className="triangle-down"></div>
                </div>
                <div className="search" style={{display:this.state.showContainer}}>
                    <div className="divSearchContainer">
                        <table>
                            <tbody>{res}</tbody>
                        </table>
                    </div>

                    <div className="footerBtn">
                        <button className="saveBtn" onClick={this.save.bind(this)}>确定</button>
                        <button className="saveBtn closeBtn" onClick={this.cancel.bind(this)}>取消</button>
                    </div>
                </div>
            </div>
        );
    }
}
