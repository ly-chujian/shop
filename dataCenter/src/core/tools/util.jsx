
/**
 * 工具类
 * **/
export default class Util{
    //constructor(a) {
    //    super(a);
    //}

    //获取对象的属性, 参数为数组，必须保证数组里面对象的属性完整
    static getProperties(arr){
        let res = [];
        if(!arr || arr.length == 0){
            return res;
        }
        for(let i in arr[0]){
            res.push(i);
        }
        return res;
    }

    //send ajax
    static doFetch(url,method,data){
        let _url = url;
        if(typeof url == "function"){
            _url = url();
        }
        if(_url.indexOf('?') == -1){
            _url = url + "?ran="+Math.random();
        }else{
            _url = url+ "&ran="+Math.random();
        }
        let headers = {
            'Content-Type': 'application/json'
        };
        method == undefined?method = "get":method = method;
        let options = {
            method:method.toUpperCase(),
            credentials:'include',
            headers:headers
        };
        if(method.toLowerCase() == "post"){
            if(data){
                options.body = JSON.stringify(data);
            }
        }
        return fetch(_url, options).then(d =>d.json());
    }

    //深度clone对象
    static cloneObj(source){
        if(source){
            return JSON.parse(JSON.stringify(source));
        }
        return null;
    }

    //根据主键获取当前对象(数组),主键key为__tmpId
    static getArrayByTmpIds(ids,data){
        let res = [];
        let tmp = data;
        ids.map(id=>{
            tmp.map(k=>{
                if(k.__tmpId == id){
                    res.push(k);
                }
            })
        })
        return res;
    }

    //获取数组某属性的集合
    static getArrayByField(field,arr){
        let res = [];
        arr.map(item=>{
            if(item[field]){
                res.push(item[field]);
            }
        })
        return res;
    }

    //添加ck和主键(__tmpId)属性,ck为可选项
    static addPrimaryAndCk(data,ck){
        data.map(item=>{
            if(ck){
                item.ck = false;
            }
            item.__tmpId = Math.ceil(Math.random()*10000000000000000);
        });
        return data;
    }

    //set cookie
    static setCookie(name,value,expires){
        let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if(expires instanceof Date){
            cookieText += "; expires=" + expires.toGMTString();
        }
        document.cookie = cookieText+";path=/;domain="+document.domain;
    }

    //get cookie
    static getCookie(name){
        let cookie = document.cookie;
        let cookieName = encodeURIComponent(name) + "=",
            cookieStart = cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart > -1){
            let cookieEnd = cookie.indexOf(';',cookieStart);
            if(cookieEnd == -1){
                cookieEnd = cookie.length;
            }
            cookieValue = decodeURIComponent(cookie.substring(cookieStart + cookieName.length,cookieEnd));
        }
        return cookieValue;
    }

    static removeCookie(name){
        this.setCookie(name,"",new Date(0));
    }

    static equalsObject(source,target){
        let p;
        for (p in source) {
            if (typeof (target[p]) == 'undefined') {
                return false;
            }
        }

        for (p in source) {
            if (source[p]) {
                switch (typeof (source[p])) {
                    case 'object':
                        if (!equals(source[p], target[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof (target[p]) == 'undefined' ||
                            (p != 'equals' && source[p].toString() != target[p].toString()))
                            return false;
                        break;
                    default:
                        if (source[p] != target[p]) {
                            return false;
                        }
                }
            } else {
                if (target[p])
                    return false;
            }
        }

        for (p in target) {
            if (typeof (source[p]) == 'undefined') {
                return false;
            }
        }

        return true;
    }
}