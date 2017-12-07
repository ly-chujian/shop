
import Util from "../core/tools/util.jsx";

export default class personEnum {

    static getAge(cb){
        Util.fetchAjax("/api/enmu/list?key=AGE","get",null).then(data=>{
            if(data.rc && data.data.length!=0){
                var tmp = [{name:"请选择",code:""}];
                data.data[0].code.map(item=>{
                    tmp.push(item);
                })
                cb(tmp);
            }else if(data.rc && data.data.length ==0 ){
                alert("当前AGE无数据");
            }else{
                alert(data.data);
            }
        })
    }
}