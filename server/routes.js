/**
 * Created by wupeng5 on 2017/7/19.
 */

//输出路由模块
module.exports = function(app) {
    app.use('/login',require('./api/login'));
    app.use('/person',require('./api/person'));
}