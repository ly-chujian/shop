/**
 * Created by wupeng5 on 2017/11/1.
 */

import { observable, computed, autorun } from "mobx";

class ObservableStore {

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

    getPropsShowFlag(flag){
        this.dialogData.params.show = flag;
    }
    getDefaultId(id){
        this.dialogData.params.id = flag;
    }
    //设置dialog所有状态更新
    setDialogAllStates(data,params){
        this.dialogData = {
            data:data,
            params:params
        }
    }
    //设置dialog除去参数部分的更新
    setDialogItems(data){
        this.dialogData.data = data;
    }

    setAutoTestShow(flag){
        this.showDialog = flag;
    }

}

export const AutoTestStore = new ObservableStore();
console.log(AutoTestStore);