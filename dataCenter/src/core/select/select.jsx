import React from 'react';
import './sel.css';
import BottomData from './bottom.jsx';
import TopData from './top.jsx';

export default class Selet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value : '',
            topData : [],
            bottomData : this.props.getData()
        }
        this.state.cloneData = this.state.bottomData;
        this.inputChange = this.inputChange.bind(this);
        this.getCkRemoveData = this.getCkRemoveData.bind(this);
    }
    componentDidMount(){
        
    }
    inputChange(event){       
        let _val = event.target.value;
        let searchData = [];
        this.state.cloneData.map((item,index)=>{
            if(item.name.indexOf(_val) > -1){
                searchData.push(item)
            }
        })
        this.setState({
            bottomData:searchData,
            value: event.target.value
        })
    }
    getCkRemoveData(params,tag){
        params.ck = !params.ck;
       // console.log(params)
        let botCkData = [];
        let topCkData = [];
        this.state.cloneData.map((item,index)=>{
            if(item.id == params.id){
                botCkData.push(params)
            }else{
                botCkData.push(item)
            }
            if(item.ck){
                topCkData.push(item)
            }
        })
        
        this.setState({
            bottomData: botCkData,
            topData : topCkData,
            value : ''
        })
    }
    render(){
       // const {bottomData} = this.state;
        return (
            <div>
               <div className="chooseZh"  data-data='isHideData' >
                    <div className="right"  data-data='isHideData' >
                        <div className="over"  data-data='isHideData' > 
                            <TopData getTopData = {this.state.topData} getRemoveData = {this.getCkRemoveData}/>
                            <input type="text" data-data='isHideData'  value={this.state.value} className="input" onChange={this.inputChange}/>                
                        </div>
                    </div>
                </div>
                <BottomData getBotData={this.state.bottomData} getCkData={this.getCkRemoveData}/>
            </div>
        );
    }
}