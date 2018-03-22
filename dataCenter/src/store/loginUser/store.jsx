/**
 * Created by wupeng5 on 2017/11/1.
 */

import {observable, action} from "mobx";

class ObservableStore {
    @observable name = "";

    constructor() {}

    @action setUser(name){
        this.name = name;
    }

    @action getUserName(){
        debugger
        return this.name;
    }
}

export const LoginUserStore = new ObservableStore();