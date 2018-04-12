/**
 * Created by wupeng5 on 2017/11/1.
 */

import {observable, action} from "mobx";
import {create, persist} from "mobx-persist";

class ObservableStore {

    @persist("object") @observable user = {name:""};

    constructor() {}

    @action setUser(name){
        this.user = {name:name};
    }

    @action getUserName(){
        return this.user.name;
    }
}

export const LoginUserStore = new ObservableStore();

const hydrate = create({});
hydrate('user',LoginUserStore)