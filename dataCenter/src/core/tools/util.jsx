
/**
 * 工具类
 * **/
let Util = {
    object:{
        equalsObject(source,target){
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
                            if (!this.equalsObject(source[p], target[p])) {
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
        },
        deepArrayClone:function(data){
            return [...data];
        },
        cloneObj(source){
            if(source){
                return JSON.parse(JSON.stringify(source));
            }
            return null;
        },
        getProperties(obj){
            let res = [];
            if(!obj){
                return res;
            }
            for(let i in obj){
                res.push(i);
            }
            return res;
        },
    },
    ajaxServer:{
        doFetch : function(url,method,data){
            let symbol = url.indexOf('?') == -1?"?":"&";
            url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
            let defer = Q.defer();
    
            let headers = {
                'Content-Type': 'application/json'
            };
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
            let that = this;
            fetch(url,options).then(d =>d.json()).then(function (data) {
                let code = data.status;
                if(code == "701"){
                    that.$router.push({path:"login"});
                }else{
                    if(code == "200"){
                        defer.resolve({data:data.data,params:data.params});
                    }else{
                        defer.reject({data: data.msg});
                    }
                }
            }).catch(function(err) {
                defer.reject({data: "Server Error!"});
                throw new Error(url + " request server error!");
            });
            return defer.promise;
        }
    },
    cookie:{
        removeCookie(name){
            this.setCookie(name,"",new Date(0));
        },
        getCookie(name){
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
        },
        setCookie(name,value,expires){
            let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if(expires instanceof Date){
                cookieText += "; expires=" + expires.toGMTString();
            }
            document.cookie = cookieText+";path=/;domain="+document.domain;
        },
    },
    arrayServer:{
        addPrimaryAndCk(data,ck){
            data.map(item=>{
                if(ck!=undefined){
                    if(!ck){
                        item.ck = false;
                    }else{
                        item.ck = true;
                    }
                }else{
                    item.ck = false;
                }
                item.__tmpId = Math.ceil(Math.random()*10000000000000000);
            });
            return data;
        },
        getCheckedItems(arr,field){
            var res = {items:[],vals:[]};
            arr.map(item=>{
                if(item.ck){
                    res.items.push(item);
                    res.vals.push(item[field]);
                }
            })
            return res;
        },
        getInfoInArrayByField(field,vals,array){
            let res = [];
            vals.map(item=>{
                array.map(k=>{
                    if(k[vals] == item){
                        res.push(k);
                    }
                })
            })
            return res;
        }
    },
    date:{
        date:function(val){
            let d = new Date(val);
            return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()
        },
        dateTime:function(val){
            return this.date(val) + " " + this.time(val);
        },
        time:function(val){
            let d = new Date(val);
            let t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            return t;
        }
    }
}

export default Util;