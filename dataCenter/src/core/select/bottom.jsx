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
        var name = e.target.className;//name != "ckcls" && name !='pullItem'
        if( name != "ckcls" && name !='pullItem' && name != 'hidecls active' && !$(e.target).parents().is('.topCls') && !$(e.target).parents().is('.chooseZh')){
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
            html.push(<p key = {Math.random()} className = {item.ck ? 'hidecls active' : 'ckcls'} onClick={e=>this.chooseItem(item)}>{item.name} <span className="icon icon-jiahao"></span></p>)
        })
        return html;
    }
    chooseItem(item){
        
       this.props.getCkData(item,'choose')
    } 
    render(){
        let getListData = this.getData();        
        return (
            <div className="pullItem" style = {{display:this.state.display}}> 
                 {getListData}
            </div>
        );
    }
}