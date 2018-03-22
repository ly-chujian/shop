/**
 * Created by wupeng5 on 2017/11/1.
 */

import { observable, action } from "mobx";

export default class AutoTestStore {

    //autotest.jsx
    @observable name = "";
    @observable showDialog = false;

    //dialog.jsx
    @observable dialogData = {
        data:{
            describe:"",
            before:{
                isBefore:"false",
                beforeType:"get",
                beforeUrl:"",
                beforeData:null
            },
            items:[{
                url:"",
                sendType:"get",
                sendData:null,
                itemDesc:""
            }]
        },
        params:{
            show:false,
            id:""
        }
    };

    constructor() {}

    @action getPropsShowFlag(flag){
        this.dialogData.params.show = flag;
    }
    @action getDefaultId(id){
        this.dialogData.params.id = flag;
    }
    //设置dialog所有状态更新
    @action setDialogAllStates(data,params){
        this.dialogData = {
            data:data,
            params:params
        }
    }

    //设置dialog除去参数部分的更新
    @action setCaseItems(data){
        //复杂数据类型，必须改变根元素指针
        this.dialogData.data.items = data;
        this.dialogData = {...this.dialogData};
    }

    @action setAutoTestShow(flag){
        this.showDialog = flag;
    }
}
