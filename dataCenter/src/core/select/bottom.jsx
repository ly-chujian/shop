import React from 'react';
export default class BottomData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: 'none'
        }
        this.hidebot = this.hidebot.bind(this);
    }
    //初始化
    componentDidMount() {
        $(document).on('click',this.hidebot);
    }
    componentWillUnmount() {
        $(document).off('click',this.hidebot);
    }
    hidebot(e){
       // var name = e.target.className;//name != "ckcls" 
        var _data = e.target.dataset.data;
        if( _data != 'isHideData'){
           this.setState({
            display : 'none'
           })
        }else{
            this.setState({
                display : 'block'
            })
        }

    }
    getData(){
        let html = [];
        var listData = this.props.getBotData;
        listData.map((item,index)=>{
            html.push(<p key = {Math.random()} data-data='isHideData' className = {item.ck ? 'hidecls active' : 'ckcls'} onClick={e=>this.chooseItem(e,item)}>{item.name} <span className="icon icon-duigou"></span></p>)
        })
        return html;
    }
    chooseItem(e,item){
       e.nativeEvent.stopImmediatePropagation();
       this.props.getCkData(item,'choose')
    } 
    render(){
        let getListData = this.getData();        
        return (
            <div className="pullItem" data-data='isHideData' style = {{display:this.state.display}}> 
                 {getListData}
            </div>
        );
    }
}