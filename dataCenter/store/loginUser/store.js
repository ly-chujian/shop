/**
 * Created by wupeng5 on 2017/11/1.
 */

import { observable, computed, autorun } from "mobx";

class ObservableStore {
    @observable name = "";

    constructor() {}

    setUser(name){
        this.name = name;
    }

    getUserName(){
        return this.name;
    }
}

export const LoginUserStore = new ObservableStore();