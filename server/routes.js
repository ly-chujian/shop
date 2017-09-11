/**
 * Created by wupeng5 on 2017/7/19.
 */

//输出路由模块
module.exports = function(app) {
    app.use('/person',require('./api/person'));
    app.use('/enmu',require('./api/enmuTable'));
}