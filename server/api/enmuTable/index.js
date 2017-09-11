/**
 * Created by wupeng5 on 2017/8/30.
 */

'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();
router.get("/list",controller.enmuCtl.getValuesByKey);
module.exports = router;