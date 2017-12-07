/**
 * Created by wupeng5 on 2017/8/31.
 */

/**
 * 全局的,常规的,枚举变量
 */
var EventKeys = {
    //table订阅了todo，当table广播的时候，push当前获取的数据给todo列表
    TODO_TABLE_GETITEM :"table2todo"
};

var ModuleRequestUrl = {
    "LOGIN":{
        login:"/api/login/login",
        logout:"/api/login/logOut"
    }
}

var CookieKeys = {
    "SHOPUSERNAME":"shopUserName"
}