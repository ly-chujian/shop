/**
 * Created by wupeng5 on 2017/12/21.
 */

/*
 * 验证表单类
 * property:strategys {json object}, 验证规则，为function
 * property:rules<Array> , 保存规则，
 * [{strategy: 'isNotEmpty',errorMsg:'用户名不能为空'},{strategy: 'minLength:6',errorMsg:'用户名长度不能小于6位'}]
 *
 * add, 添加规则
 * start:Array  返回结果，为数组
 * */
var Validator = function(){
    this.rules = [];
    /*
     * rules: [{strategy: 'isNotEmpty',errorMsg:'用户名不能为空'},
     {strategy: 'minLength:6',errorMsg:'用户名长度不能小于6位'}]
     *dom :dom element
     *
     * 返回删除的第一个
     *  */
    this.add = function(value,rules){
        var that = this;
        rules.map(function(rule){
            (function(rule){
                //获取strategy key数组，可能有附加条件用:隔开
                var strategyAry = rule.strategy.split(":");
                var errorMsg = rule.errorMsg;
                var fun = function(){
                    //获取获取strategy key具体值
                    var strategy = strategyAry.shift();
                    strategyAry.unshift(value);
                    strategyAry.push(errorMsg);
                    return that.strategys[strategy].apply(value,strategyAry);
                }
                that.rules.push(fun);
            })(rule);
        })
        return this;
    }
    this.start = function(){
        var res = [];
        this.rules.map(function(validatorFunc){
            var msg = validatorFunc();
            if(msg){
                res.push(msg);
            }
        })
        return res;
    }
}

Validator.prototype.strategys = {
    isNotEmpty:function(value,errorMsg){
        if(value === "") {
            return errorMsg;
        }
    },
    minLength:function(value,length,errorMsg){
        if(value.length < length) {
            return errorMsg;
        }
    },
    maxLength:function(value,length,errorMsg){
        if(value.length > length) {
            return errorMsg;
        }
    },
    mobileFormat: function(value,errorMsg) {
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    emailFormat:function(value,errorMsg){
        if(!/\w@\w*\.\w/.test(value)){
            return errorMsg;
        }
    },
    urlFormat:function(value,errorMsg){
        var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|" // a slash isn't required if there is no file name
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re = new RegExp(strRegex);
        if (!re.test(value)){
            return errorMsg;
        }
    },
    numFormat:function(value,errorMsg){
        if(isNaN(str)){
            return errorMsg;
        }
    }
}