/**
 * Created by wupeng5 on 2017/8/30.
 */

'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get("/list",controller.logCtl.list);
router.post("/add",controller.logCtl.addLog);
router.get("/delete",controller.logCtl.delLog);

module.exports = router;