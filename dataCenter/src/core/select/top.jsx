import React from 'react';
export default class TopData extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
       // let topData = this.props.getTopData;
    }
    getData(){
        let topData = this.props.getTopData;
        let topHtml = [];
        topData.map((item,index)=>{
            topHtml.push(              
                   <div className="item over fl"  data-data='isHideData'  key = {Math.random()} ><span className="fl" data-data='isHideData'>{item.name}</span> <span className="icon icon-jian"  data-data='isHideData' onClick = {e=>this.remove(item)}></span></div>
             )
        })
        return topHtml;
    }
    remove(item){
        console.log(item + 'remove')
        this.props.getRemoveData(item,'remove')
    }
    render(){
        
        let getTopData = this.getData();
        return (
              <span className="groupSpan over">
                {getTopData}
              </span> 
        );
    }
}