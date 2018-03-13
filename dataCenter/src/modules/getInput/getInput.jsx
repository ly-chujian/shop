import React from 'react';
import $ from 'jquery';

export default class GetInput extends React.Component{

    constructor(props){
        super(props);
        this.state = {textVal:'',radioVal:"red", optionVal: [],checkboxVal:[],list:[]};
    }
    componentDidMount () {
        $.ajax({
            url:"http://api.douban.com//v2/movie/in_theaters?start=1&count=2",
            type:"get",
            dataType : "jsonp",
            success:function(d){
                var lastGist = d.subjects[0];

                this.setState({
                    list : d.subjects,
                    textVal: lastGist.title,
                    radioVal : 'blue',
                    optionVal : 2,
                    checkboxVal : [1]
                });
            }.bind(this)

        })

    }
    getList(){
        var _list = [];
        this.state.list.map((item,index)=>{
            _list.push(<tr key={Math.random()}><td>{item.title}</td><td>{item.alt}</td><td><button className='btn btn-sm btn-danger' onClick={this.del.bind(this,index)}>删除</button><button className='btn btn-sm btn-primary' onClick={this.editList.bind(this,index)}>修改</button></td></tr>);
        });
        return _list;
    }
    del(index,e){
        this.setState({
            list: this.state.list.filter((elem, i) => index !== i)
        })
    }
    editList(index,e){
        var _data = this.state.list;
        for(var i=0;i<_data.length;i++){
            if(index == i){
                console.log(_data[i])
            }
        }
    }

    /*TEXT*/
    handleUsernameChange (event) {
        this.setState({
            textVal: event.target.value
        });
    }
    btnText(){
        alert(this.state.textVal);
    }
    /*Radio*/
    changeRadioColor(e){
        this.setState({
            radioVal: e.target.value
        });
    }
    btnRadio(){
        alert(this.state.radioVal);
    }
    /*Ckeckbox*/
    getCheckBox(){
        var html = [];
        var arr = [{name:'red',code:1},{name:'blue',code:2},{name:'pink',code:3}];

        //for(var i = 0 ; i < arr.lenght ; i ++){
        //    this.setState({
        //        "checkState"+i:0
        //    });
        //}
        //

        /*<input  type="checkbox"  name="colorb" value={item.code} checked={this.state.checkboxVal === item.code }
         onChange={this.changeCheckboxColor.bind(this)} />
         this.state["checkState"+index] == 0 ? "false" : "checked"*/

        var aa = this.state.checkboxVal;
        arr.map((item,index)=>{
            for(var i=0;i<aa.length;i++){
               if(aa[i] == item.code){
                    html.push(
                        <p>
                            <input  type="checkbox"  name="colorb" value={item.code} checked={item.code}
                                    onChange={this.changeCheckboxColor.bind(this)} />{item.name}</p>

                    );
                }else{
                    html.push(
                        <p>
                            <input  type="checkbox"  name="colorb" value={item.code}
                                    onChange={this.changeCheckboxColor.bind(this)} />{item.name}</p>

                    );
                }
            }

        });
        return html;
    }
    changeCheckboxColor(e){

        var checkValues = this.state.checkboxVal.slice();
        var newVal = e.target.value;
        var index = checkValues.indexOf(newVal);

        if( index == -1 ){
            checkValues.push( newVal )
        }else{
            checkValues.splice(index,1);
        }
        this.state.checkboxVal = checkValues;

        /*this.setState({
            checkboxVal: checkValues
        })
*/
       /* var index = $(e.target).index();

        var data = {};
        data["checkState"+index] = 1;
        this.setState(data);*/

    }
    btnCheckbox (){
        alert(this.state.checkboxVal);
    }

    /*select*/

    getSelect(){
        var arr = [{name:'red',code:1},{name:'blue',code:2},{name:'pink',code:3}];
        var sel = [];
        arr.map((item,index)=>{
            sel.push(
                    <option key={Math.random()} value={item.code}>{item.name}</option>
            );
        });
        return sel;
    }
    handleSelChange(event){
       /* var checked = [];
        var sel = event.target;
        for (var i = 0; i < sel.length; i++){
            var option = sel.options[i];
            if (option.selected){
                checked.push(option.value);
            }
        }*/
        this.setState({
            optionVal: event.target.value
        });
    }
    btnSel(event){
        event.preventDefault();
        alert(this.state.optionVal);
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.checkboxVal !== nextState.checkboxVal) {
            return true;
        }
        return false;
        //return false 则不更新组件
    }

    render(){
        var boxHtml = this.getCheckBox();
        var selHtml = this.getSelect();
        var listData = this.getList();
        return (
            <div>
                {/*TEXT*/}
                <input type="text" value={this.state.textVal} className='input-sm'  onChange={this.handleUsernameChange.bind(this)} />
                <input type="button" className='btn btn-sm btn-info' onClick={this.btnText.bind(this)} value='textVal' />

                <hr/>
                {/*Radio*/}

                <input type="radio" name='color' value='red' checked={this.state.radioVal === 'red'} onChange={this.changeRadioColor.bind(this)}/>  Red
                <input type="radio" name='color' value='blue' checked={this.state.radioVal === 'blue'} onChange={this.changeRadioColor.bind(this)}/> Blue
                <input type="button" className='btn btn-sm btn-info'  onClick={this.btnRadio.bind(this)} value='RadioVal' />


                <hr/>
                {/*select*/}
                <select  className='input-sm' onChange={this.handleSelChange.bind(this)} value={this.state.optionVal}>/**/
                    <option value="">All</option>
                    {selHtml}
                </select>
                <input type="button" className='btn btn-sm btn-info'  onClick={this.btnSel.bind(this)} value='selVal' />

                <hr/>
                {/*checkbox*/}

                {boxHtml}

                <input type="button" className='btn btn-sm btn-info'  onClick={this.btnCheckbox.bind(this)} value='CheckboxVal' />

                <table className='table table-bordered'>
                    <thead>
                    <tr>
                        <th>电影名字</th>
                        <th>链接</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                        {listData}
                    </tbody>
                </table>
            </div>
        );
    }
}
