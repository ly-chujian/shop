/**
 * Created by wupeng5 on 2017/7/19.
 */

//加载依赖的lib
var path 			= require('path');
var express 		= require('express');
var mongoose		= require('mongoose');
var session = require('express-session');
//最新版本要加上这行代码，否则会有个警告,导致save等操作失败
//这是由于版本升级导致的
//Mongoose: mpromise (mongoose’s default promise library) is deprecated, plug in your own promise library instead:
mongoose.Promise = global.Promise = require('bluebird');

//如果有数据库修改成路径, mac本直接修改后面的数据库名称, 如果没有就注释掉

//必须要加上参数{useMongoClient: true}，
//否则会警告：DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead
//这是由于版本升级导致的
mongoose.connect("mongodb://localhost/shops",{useMongoClient: true});

//初始化端口号
var port = 3008;

//setup server
var app = express();

//这个包非常重要，是为了解决nodejs里面post参数接受异常的问题
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//创建node服务
var server = require('http').createServer(app);

//设置端口号
app.set('port',port);

app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shop session'
}));

//这个也非常重要，设置前端HTML页面的相对路径, 后面的参数可按照实际情况修改
//app.use(express.static(path.join(__dirname,'../Client')));

app.all("*",function(req,res,next){
    console.log(req.url);
    //不拦截登录的action api
    if(req.url.indexOf('/login/login') != -1 || req.url.indexOf('/login/register') != -1){
        console.log("login action!");
        next();
    }else{
        //如果请求里面包含api, 那么肯定是由nginx转发过来的, 输出index
        if(req.url.indexOf('/api') != -1){
            console.log("not api action, out index.html page!");
            res.sendFile(path.resolve(__dirname, '../dataCenter/dist/index.html'));
        }else{
            //正常调用api，验证用户权限
            // next();
            if (!req.session.user) {
                return res.status(200).json({status:"701",msg:"未登录!",data:null});
            }else{
               next();
            }
        }
    }
})

//引入路由文件,  路由全部在routes.js里面
require('./routes')(app);

//start server
server.listen(port, function() {
    console.log('Your node server is running on '
        + app.get('env') + ' at ' + port + ' ~');
});

//没有找到路由的情况下发送404
app.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 - Page not found!!!!!!');
});

//当系统错误，走500
app.use(function(req, res) {
    res.status(500);
    res.type('text/plain');
    res.send('500 - Server error!');
});