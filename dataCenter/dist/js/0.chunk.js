webpackJsonp([0],{131:function(e,t){},148:function(e,t,a){"use strict";var o,n=a(0),s=a.n(n),r=a(25),l=a(149),i=a(150),c=a(151),p=a(131),m=a.n(p),u=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},function(e,t){function a(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),d=function(e){function t(t){var a=e.call(this,t)||this;return a.state={data:[],cols:a.props.options.map,ck:!1,pageOption:{index:a.props.options.pageOption.index?a.props.options.pageOption.index:1,size:a.props.options.pageOption.size?a.props.options.pageOption.size:10,count:0,total:0}},a.option=a.props.options,a.analysis=a.option.analysis,a.showCk=!!a.option.showCk,a.actions=a.option.actions,a.getUrl=a.option.getUrl,a.noticeChangeCols=a.noticeChangeCols.bind(a),a.accpetHBNotice=a.accpetHBNotice.bind(a),a.goToIndex=a.goToIndex.bind(a),a.prev=a.prev.bind(a),a.next=a.next.bind(a),a.getCheckedItems=a.getCheckedItems.bind(a),a.originCols=r.a.object.deepArrayClone(a.props.options.map),a}return u(t,e),t.prototype.componentDidMount=function(){this.getData(this.state.pageOption.index)},t.prototype.getData=function(e){var t=this;e||(e=1);var a=this.getUrl();if(""!==a){var o=-1===a.indexOf("?")?"?":"&",n=this.state.pageOption.size;a+=o+this.option.pageOption.indexKey+"="+e+"&"+this.option.pageOption.sizeKey+"="+n,r.a.ajaxServer.doFetch(a,"get",null).then(function(a){var o={};if(o=t.analysis?t.analysis(a):a,(o=t.analysis(a)).data&&o.data instanceof Array&&0!=o.data.length){var s=r.a.arrayServer.addPrimaryAndCk(o.data),l=-1;l=parseInt(o.count)%n==0?parseInt(o.count)/n:parseInt(parseInt(o.count)/n)+1,t.setState({ck:!1,data:s,pageOption:{index:e,count:s.length,total:l,size:n}})}else console.log("检查analysis, getUrl, pageOption参数!")})}},t.prototype.getCheckedItems=function(){return this.state.data&&this.state.data instanceof Array?this.state.data.filter(function(e,t,a){return e.ck}):[]},t.prototype.getParams=function(){return{index:this.state.pageOption.index,data:this.state.data}},t.prototype.search=function(e){e?this.getData(this.state.pageOption.index):this.getData()},t.prototype.noticeChangeCols=function(e){this.setState({cols:e})},t.prototype.accpetHBNotice=function(e,t){if(e&&(this.state.data.map(function(t){t.ck=e.ck}),this.setState({data:this.state.data,ck:e.ck})),t){var a=r.a.arrayServer.getCheckedItems(t.data,"__tmpId").items.length==this.state.data.length;this.setState({data:t.data,ck:a})}},t.prototype.next=function(){if(!(this.state.pageOption.index>=this.state.pageOption.count)){var e=this.state.pageOption.index;e++,this.getData(e)}},t.prototype.prev=function(){if(!(this.state.pageOption.index<=1)){var e=this.state.pageOption.index;e--,this.getData(e)}},t.prototype.goToIndex=function(e){this.getData(e)},t.prototype.getBodyComp=function(){return 0==this.state.data.length?s.a.createElement("tbody",null,s.a.createElement("tr",null,s.a.createElement("td",null," data is null "))):s.a.createElement(i.a,{actions:this.actions,data:this.state.data,cols:this.state.cols,accpetHBNotice:this.accpetHBNotice,showCk:this.showCk})},t.prototype.getPagingComp=function(){return 0==this.state.data.length?s.a.createElement("div",null,"data is null"):s.a.createElement(c.a,{goNext:this.next,goPrev:this.prev,goIndex:this.goToIndex,options:this.state.pageOption})},t.prototype.getHeaderComp=function(){return this.state.cols&&this.state.cols instanceof Array!=0&&0!=this.state.cols.length?s.a.createElement(l.a,{originCols:this.originCols,accpetHBNotice:this.accpetHBNotice,noticeChangeCols:this.noticeChangeCols,ck:this.state.ck,actions:this.actions,cols:this.state.cols,showCk:this.showCk}):s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("td",null," data is null ")))},t.prototype.render=function(){return s.a.createElement("div",{className:m.a.panel_table+" text-center"},s.a.createElement("div",{className:m.a.overflow_table},s.a.createElement("table",{className:"table table-bordered table-sm"},this.getHeaderComp(),this.getBodyComp())),this.getPagingComp())},t}(s.a.Component);t.a=d},149:function(e,t,a){"use strict";var o,n=a(0),s=a.n(n),r=a(25),l=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},function(e,t){function a(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),i=function(e){function t(t){var a=e.call(this,t)||this;return a.setAll=a.setAll.bind(a),a.showChangeColsDialog=a.showChangeColsDialog.bind(a),a.defaultCols=r.a.arrayServer.addPrimaryAndCk(a.props.originCols,!0),a.itemCheckChange=a.itemCheckChange.bind(a),a.showCk=a.props.showCk,a.actions=a.props.actions,a.ck=a.props.ck,a.originCols=a.props.originCols,a.cols=a.props.cols,a.chooseColsKey=Math.ceil(1e9*Math.random()),a}return l(t,e),t.prototype.shouldComponentUpdate=function(e,t){var a=this.ck==e.ck;return!(r.a.object.equalsObject(this.cols,e.cols)&&a)},t.prototype.componentWillReceiveProps=function(e){},t.prototype.setAll=function(){this.props.accpetHBNotice({ck:!this.ck},null)},t.prototype.colsLen=function(){var e=this,t=[];return this.defaultCols.map(function(a,o){t.push(s.a.createElement("p",{key:Math.random()},s.a.createElement("input",{type:"checkbox",defaultChecked:a.ck,onClick:function(t){e.itemCheckChange(a,t)}}),s.a.createElement("span",null,a.val)))}),t},t.prototype.itemCheckChange=function(e,t){e.ck=!e.ck,t.target.checked=e.ck},t.prototype.reSetCols=function(){var e=r.a.arrayServer.getCheckedItems(this.defaultCols).items;0!=e.length&&this.props.noticeChangeCols(e)},t.prototype.getDialogHTML=function(){var e=this;return[s.a.createElement("div",{key:Math.random(),className:"colsModal",ref:this.chooseColsKey},this.colsLen(),s.a.createElement("div",{className:"bot"},s.a.createElement("button",{ref:this.colsBtnCalcelKey,className:"btn btn-sm btn-light",onClick:this.showChangeColsDialog},"取消"),s.a.createElement("button",{ref:this.colsBtnSaveKey,className:"btn btn-sm btn-info",onClick:function(t){return e.reSetCols()}},"确定")))]},t.prototype.showChangeColsDialog=function(){"block"==this.refs[this.chooseColsKey].style.display?this.refs[this.chooseColsKey].style.display="none":this.refs[this.chooseColsKey].style.display="block"},t.prototype.getHeaderHTML=function(){var e=this,t=[];return this.showCk&&t.push(s.a.createElement("th",{className:"text-center",key:Math.random()},s.a.createElement("input",{checked:this.ck,type:"checkbox",onChange:this.setAll}))),this.actions&&0!=this.actions.length&&t.push(s.a.createElement("th",{className:"text-center",key:Math.random(),className:"thCols"},"操作")),this.cols.map(function(a,o){0==o?t.push(s.a.createElement("th",{key:Math.random(),className:"oneTh"},s.a.createElement("i",{className:"icon icon-tuichu",onClick:e.showChangeColsDialog}),a.val,e.getDialogHTML())):t.push(s.a.createElement("th",{key:Math.random()},a.val))}),t},t.prototype.render=function(){return this.cols=this.props.cols,this.ck=this.props.ck,console.log("%crender header","color:red"),s.a.createElement("thead",{className:"thead-dark"},s.a.createElement("tr",null,this.getHeaderHTML()))},t.prototype.componetWillUnmount=function(){},t}(s.a.Component);t.a=i},150:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_react__=__webpack_require__(0),__WEBPACK_IMPORTED_MODULE_0_react___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__),__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__=__webpack_require__(25),__extends=this&&this.__extends||(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},function(e,t){function a(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),extendStatics,Body=function(_super){function Body(e){var t=_super.call(this,e)||this;return t.showCk=t.props.showCk,t.actions=t.props.actions,t.selectRow=t.selectRow.bind(t),t.data=t.props.data,t.cols=t.props.cols,t.oldData=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.object.cloneObj(t.props.data),t}return __extends(Body,_super),Body.prototype.shouldComponentUpdate=function(e,t){var a=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.object.equalsObject(this.oldData,e.data),o=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.object.equalsObject(this.cols,e.cols);return!(a&&o)},Body.prototype.componentWillReceiveProps=function(e){},Body.prototype.getCeilHTML=function(row){var col=[];if(this.showCk&&col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{defaultChecked:row.ck,type:"checkbox"}))),this.actions&&0!=this.actions.length){var tmp_1=[];this.actions.map(function(e){tmp_1.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button",{className:"btn btn-link",key:Math.random(),onClick:function(t){return e.action(row)}},e.val))}),col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},tmp_1))}return this.cols.map(function(item){var key=item.key,val="";if("boolean"==typeof row[key])val=row[key].toString();else{var v="row."+item.key,tmp=eval("("+v+")");if(void 0==tmp)val="";else{var type=item.type;if(type)switch(type=type.toLowerCase(),type){case"date":val=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.date.date(tmp);break;case"datetime":val=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.date.dateTime(tmp);break;case"time":val=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.date.time(tmp);break;default:val=tmp}else val=tmp}}item.convert&&item.action?col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{onClick:function(e){return item.action(row,item)}},item.convert(row,item)))):item.convert&&!item.action?col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},item.convert(row,item))):!item.convert&&item.action?col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{onClick:function(e){return item.action(row,item)}},val))):col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},val))}),col},Body.prototype.selectRow=function(e,t){t.ck=!t.ck,this.props.accpetHBNotice(null,{data:this.data})},Body.prototype.getBodyHTML=function(){var e=this,t=[];return this.data.map(function(a){t.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("tr",{key:Math.random(),onClick:function(t){return e.selectRow(t,a)}},e.getCeilHTML(a)))}),t},Body.prototype.render=function(){return this.data=this.props.data,this.cols=this.props.cols,this.oldData=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.object.cloneObj(this.props.data),console.log("%crender body","color:blue"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("tbody",null,this.getBodyHTML())},Body}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);__webpack_exports__.a=Body},151:function(e,t,a){"use strict";var o,n=a(0),s=a.n(n),r=a(131),l=a.n(r),i=a(25),c=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},function(e,t){function a(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),p=function(e){function t(t){var a=e.call(this,t)||this;return a.goIndex=a.goIndex.bind(a),a.pprev=a.pprev.bind(a),a.pnext=a.pnext.bind(a),a.goIndexKey=Math.ceil(1e8*Math.random()),a}return c(t,e),t.prototype.shouldComponentUpdate=function(e,t){return!i.a.object.equalsObject(this.props.options,e.options)},t.prototype.componentWillReceiveProps=function(e){this.setState({options:e.options})},t.prototype.pprev=function(){this.props.goPrev()},t.prototype.pnext=function(){this.props.goNext()},t.prototype.goIndex=function(){this.props.goIndex(this.refs[this.goIndexKey].value)},t.prototype.render=function(){console.log("%c render paging","color:green");this.props.options.index;var e=this.props.options.count;this.props.options.total;return s.a.createElement("div",{className:l.a.paging+" pageNumCls"},s.a.createElement("nav",{"aria-label":"Page navigation example"},s.a.createElement("ul",{className:"pagination"},s.a.createElement("li",{className:"page-item",onClick:this.pprev},s.a.createElement("a",{className:"page-link",href:"#"},"Previous")),s.a.createElement("li",{className:"page-item"},s.a.createElement("a",{className:"page-link",href:"#"},"共",e,"条")),s.a.createElement("li",{className:"page-item"},s.a.createElement("a",{className:"page-link",href:"#"},"当前弟")),s.a.createElement("li",{className:"page-item"},s.a.createElement("a",{className:"page-link",href:"#"},"1/2")),s.a.createElement("li",{className:"page-item"},s.a.createElement("a",{className:"page-link",href:"#"},"页")),s.a.createElement("li",{className:"page-item",onClick:this.pnext},s.a.createElement("a",{className:"page-link",href:"#"},"Next")),s.a.createElement("li",{className:"page-item"},s.a.createElement("a",{className:"page-link",href:"#"},"到")),s.a.createElement("li",{className:"page-item"},s.a.createElement("input",{type:"text",ref:this.goIndexKey,className:"form-control input-sm",style:{width:"60px"},placeholder:"第几页"})),s.a.createElement("li",{className:"page-item",onClick:this.goIndex.bind(this)},s.a.createElement("a",{className:"page-link",href:"#"},"确定")))))},t.prototype.componetWillUnmount=function(){this.goIndexKey=null},t}(s.a.Component);t.a=p},172:function(e,t,a){"use strict";var o=a(26),n=this&&this.__assign||Object.assign||function(e){for(var t,a=1,o=arguments.length;a<o;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},s=this&&this.__decorate||function(e,t,a,o){var n,s=arguments.length,r=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,a,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(r=(s<3?n(r):s>3?n(t,a,r):n(t,a))||r);return s>3&&r&&Object.defineProperty(t,a,r),r},r=function(){function e(){this.name="",this.showDialog=!1,this.dialogData={data:{describe:"",before:{isBefore:"false",beforeType:"get",beforeUrl:"",beforeData:null},items:[{url:"",sendType:"get",sendData:null,itemDesc:""}]},params:{show:!1,id:""}}}return e.prototype.getPropsShowFlag=function(e){this.dialogData.params.show=e},e.prototype.getDefaultId=function(e){this.dialogData.params.id=flag},e.prototype.setDialogAllStates=function(e,t){this.dialogData={data:e,params:t}},e.prototype.setCaseItems=function(e){this.dialogData.data.items=e,this.dialogData=n({},this.dialogData)},e.prototype.setAutoTestShow=function(e){this.showDialog=e},s([o.h],e.prototype,"name",void 0),s([o.h],e.prototype,"showDialog",void 0),s([o.h],e.prototype,"dialogData",void 0),s([o.c],e.prototype,"getPropsShowFlag",null),s([o.c],e.prototype,"getDefaultId",null),s([o.c],e.prototype,"setDialogAllStates",null),s([o.c],e.prototype,"setCaseItems",null),s([o.c],e.prototype,"setAutoTestShow",null),e}();t.a=r},200:function(e,t,a){"use strict";var o,n=a(0),s=a.n(n),r=a(25),l=a(201),i=a.n(l),c=a(13),p=a(172),m=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},function(e,t){function a(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),u=this&&this.__decorate||function(e,t,a,o){var n,s=arguments.length,r=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,a,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(r=(s<3?n(r):s>3?n(t,a,r):n(t,a))||r);return s>3&&r&&Object.defineProperty(t,a,r),r},d=new p.a,h=function(e){function t(t){var a=e.call(this,t)||this;return a.describeEl=null,a.isBeforeEl=null,a.beforeUrlEl=null,a.beforeTypeEl=null,a.beforeDataEl=null,a.observer=d,a.initData=a.observer.dialogData.data,a.observer.setDialogAllStates(a.initData,{show:a.props.show,id:a.props.id}),a.getBeforeData=a.getBeforeData.bind(a),a.getCaseItems=a.getCaseItems.bind(a),a.getCkStatus=a.getCkStatus.bind(a),a.caseItems=null,a}return m(t,e),t.prototype.cancel=function(){this.props.cb(!1)},t.prototype.componentWillReceiveProps=function(e,t){var a=this;e.id&&e.show?r.a.doFetch("/api/at/getItems/"+e.id).then(function(t){1==t.data.length&&(a.caseItems=t.data[0].data.items.slice(),a.observer.setDialogAllStates(t.data[0].data,{show:e.show,id:e.id}))}):(this.caseItems=this.initData.items.slice(),this.observer.setDialogAllStates(this.initData,{show:e.show,id:""}))},t.prototype.save=function(){var e=this,t={describe:this.describeEl.value,before:this.getBeforeData(),items:this.getCaseItems()};this.observer.dialogData.params.show&&this.observer.dialogData.params.id?(performanceTool.setStart(),r.a.ajaxServer.doFetch("/api/at/edit/"+this.observer.dialogData.params.id,"post",t).then(function(t){t.rc||alert(t.data),performanceTool.compare("AUTOEDIT"),e.props.cb(!0)})):(performanceTool.setStart(),r.a.ajaxServer.doFetch("/api/at/add","post",t).then(function(t){t.rc||alert(t.data),performanceTool.compare("AUTOADD"),e.props.cb(!0)}))},t.prototype.addItems=function(){this.caseItems.push({url:"",sendType:"get",sendData:null,itemDesc:""}),this.observer.setCaseItems(this.caseItems)},t.prototype.reduce=function(e,t){this.caseItems.splice(t,1),this.observer.setCaseItems(this.caseItems)},t.prototype.getCkStatus=function(e){for(var t="",a=0;a<e.length;a++)if(e[a].checked){t=e[a].value;break}return t},t.prototype.getBeforeData=function(){return{isBefore:this.getCkStatus(this.isBeforeEl.querySelectorAll("input[type=radio]")),beforeType:this.getCkStatus(this.beforeTypeEl.querySelectorAll("input[type=radio]")),beforeUrl:this.beforeUrlEl.value,beforeData:this.beforeDataEl.value}},t.prototype.getCaseItems=function(){var e=this;return this.caseItems.map(function(t){t.itemDesc=t.itemDescEl.value,t.sendData=t.sendDataEl.value,t.sendType=e.getCkStatus(t.sendTypeEl.querySelectorAll("input[type=radio]")),t.url=t.urlEl.value,delete t.itemDescEl,delete t.sendDataEl,delete t.sendTypeEl,delete t.urlEl}),this.caseItems},t.prototype.render=function(){var e=this;return console.log("render dialog"),this.observer.dialogData.params.show?s.a.createElement("div",{style:{display:1==this.observer.dialogData.params.show?"block":"none"}},s.a.createElement("div",{className:i.a.black}),s.a.createElement("div",{className:"modal",style:{display:"block"}},s.a.createElement("div",{className:"black"}),s.a.createElement("div",{className:"modal-dialog"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("h5",{className:"modal-title",id:"exampleModalLabel"},"维护数据"),s.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close",onClick:function(t){e.cancel()}},s.a.createElement("span",{"aria-hidden":"true"},"×"))),s.a.createElement("div",{className:i.a.overflowY+" modal-body",style:{overflowY:"auto"}},s.a.createElement("form",{className:"form-horizontal tableForm",role:"form"},s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right"},"测试用例描述:"),s.a.createElement("div",{className:"col-sm-8"},s.a.createElement("input",{type:"text",ref:function(t){e.describeEl=t},className:"form-control input-sm",defaultValue:this.observer.dialogData.data.describe}))),s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right "},"是否需要注入数据:"),s.a.createElement("div",{className:"col-sm-8",ref:function(t){e.isBeforeEl=t}},s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",id:"inlineRadio1",value:"true",name:"isBefore",defaultChecked:"true"==this.observer.dialogData.data.before.isBefore}),s.a.createElement("label",{className:"form-check-label",htmlFor:"inlineRadio1"},"是")),s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",id:"inlineRadio2",value:"false",name:"isBefore",defaultChecked:"false"==this.observer.dialogData.data.before.isBefore}),s.a.createElement("label",{className:"form-check-label",htmlFor:"inlineRadio2"},"否")))),s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right"},"请求URL:"),s.a.createElement("div",{className:"col-sm-8"},s.a.createElement("input",{type:"text",ref:function(t){e.beforeUrlEl=t},className:"form-control input-sm",defaultValue:this.observer.dialogData.data.before.beforeUrl}))),s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right"},"请求方式:"),s.a.createElement("div",{className:"col-sm-8",ref:function(t){e.beforeTypeEl=t}},s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",id:"inlineRadio3",value:"get",name:"beforeType",defaultChecked:"get"==this.observer.dialogData.data.before.beforeType}),s.a.createElement("label",{className:"form-check-label",htmlFor:"inlineRadio3"},"get")),s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",id:"inlineRadio4",value:"post",name:"beforeType",defaultChecked:"post"==this.observer.dialogData.data.before.beforeType}),s.a.createElement("label",{className:"form-check-label",htmlFor:"inlineRadio4"},"post")))),s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right"},"参数data:"),s.a.createElement("div",{className:"col-sm-8"},s.a.createElement("textarea",{className:"form-control input-sm",ref:function(t){e.beforeDataEl=t},defaultValue:this.observer.dialogData.data.before.beforeData}))),s.a.createElement("div",{className:"form-group row"},s.a.createElement("h5",{className:i.a.inline+" col-sm-3 text-right"},"单元测试数据"),s.a.createElement("i",{className:"icon icon-jiahao col-sm-8 text-right font26",onClick:function(t){e.addItems()}})),this.caseItems.map(function(t,a){var o=Math.ceil(1e6*Math.random());return s.a.createElement("div",null,s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right"},"描述:"),s.a.createElement("div",{className:"col-sm-8"},s.a.createElement("input",{type:"text",ref:function(e){return t.itemDescEl=e},className:"form-control input-sm",defaultValue:t.itemDesc}))),s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right"},"请求URL:"),s.a.createElement("div",{className:"col-sm-8"},s.a.createElement("input",{type:"text",ref:function(e){return t.urlEl=e},className:"form-control input-sm",defaultValue:t.url}))),s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right"},"请求方式:"),s.a.createElement("div",{className:"col-sm-8",ref:function(e){return t.sendTypeEl=e}},s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",value:"get",name:o,defaultChecked:"get"==t.sendType}),s.a.createElement("label",{className:"form-check-label"},"get")),s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",value:"post",name:o,defaultChecked:"post"==t.sendType}),s.a.createElement("label",{className:"form-check-label"},"post")))),s.a.createElement("div",{className:"form-group row"},s.a.createElement("label",{className:"col-sm-3 col-form-label col-form-label-sm text-right"},"参数data:"),s.a.createElement("div",{className:"col-sm-8"},s.a.createElement("textarea",{className:"form-control input-sm",defaultValue:t.sendData,ref:function(e){return t.sendDataEl=e}})),s.a.createElement("div",{className:"col-sm-1",style:{marginLeft:"-10px"}},s.a.createElement("i",{className:"icon icon-jian  font26",onClick:function(o){e.reduce(t,a)}}))))}))),s.a.createElement("div",{className:"modal-footer"},s.a.createElement("input",{type:"button",className:"btn btn-light",value:"取消",onClick:function(t){e.cancel()}}),s.a.createElement("input",{type:"button",className:"btn btn-primary",value:"确定",onClick:function(t){e.save()}})))))):s.a.createElement("div",null)},t=u([c.c],t)}(s.a.Component);t.a=h},201:function(e,t){},43:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,n=a(0),s=a.n(n),r=a(25),l=a(148),i=a(200),c=a(172),p=a(13),m=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},function(e,t){function a(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),u=this&&this.__decorate||function(e,t,a,o){var n,s=arguments.length,r=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,a,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(r=(s<3?n(r):s>3?n(t,a,r):n(t,a))||r);return s>3&&r&&Object.defineProperty(t,a,r),r},d=new c.a,h=function(e){function t(t){var a=e.call(this,t)||this;a.observer=d,a.edit=a.edit.bind(a),a.run=a.run.bind(a),a.selectSingleItemId="",a.selectedItems=[],a.search=a.search.bind(a);var o=a;return a.tableOptions={actions:[{key:"edit",val:"修改",action:a.edit},{key:"run",val:"Run",action:a.run}],showCk:!0,map:[{key:"describe",val:"测试用例描述"},{key:"operator",val:"操作人"},{key:"runTime",val:"操作时间",type:"time"},{key:"before",val:"用例个数",convert:a.cCount},{key:"items.length",val:"个数"}],getUrl:function(){var e=o.observer.name;return o.searchNameEl&&(e=o.searchNameEl.value),"/api/at/list?describe="+e},pageOption:{sizeKey:"size",indexKey:"index"},analysis:function(e){return{data:e.data.data,count:e.data.count}}},a.searchNameEl=null,a.oldVal="",a}return m(t,e),t.prototype.cCount=function(e){return e.items.length},t.prototype.edit=function(e){this.selectSingleItemId=e._id,this.tableOptions.isReRender=!1,this.observer.setAutoTestShow(!0)},t.prototype.run=function(e){r.a.doFetch("/api/at/run?id="+e._id).then(function(e){e.rc?alert("成功运行的case:"+e.data.y.join(",")):alert(e.data)})},t.prototype.runMultiple=function(){r.a.doFetch("/api/at/run?id="+r.a.getArrayByField("_id",this.selectedItems).join(",")).then(function(e){e.rc?alert("成功运行的case:"+e.data.y.join(",")):alert(e.data)})},t.prototype.search=function(){this.refs.tableKill.search(),this.oldVal=this.searchNameEl.value},t.prototype.addItem=function(){this.selectSingleItemId="",this.tableOptions.isReRender=!1,this.observer.setAutoTestShow(!0)},t.prototype.cb=function(e){e&&(this.tableOptions.isReRender=!0,this.refs.tableKill.search()),this.observer.setAutoTestShow(!1)},t.prototype.render=function(){var e=this;return console.log("render auto test"),s.a.createElement("div",null,s.a.createElement("div",{className:"form-group topInput row"},s.a.createElement("label",{className:"col-sm-1 col-form-label col-form-label-sm text-right"},"name:"),s.a.createElement("div",{className:"col-sm-2"},s.a.createElement("input",{type:"text",defaultValue:this.observer.name,ref:function(t){return e.searchNameEl=t},className:"form-control form-control-sm"})),s.a.createElement("input",{type:"button",value:"Add",onClick:function(t){return e.addItem()},className:"btn btn-sm btn-info"}),s.a.createElement("input",{type:"button",value:"Run",onClick:function(t){return e.runMultiple()},className:"btn btn-sm btn-success"}),s.a.createElement("input",{type:"button",value:"Search",onClick:function(t){return e.search()},className:"btn btn-sm btn-primary "})),s.a.createElement(l.a,{ref:"tableKill",options:this.tableOptions}),s.a.createElement(i.a,{id:this.selectSingleItemId,show:this.observer.showDialog,cb:function(t){e.cb(t)}}))},t=u([p.c],t)}(s.a.Component);t.default=h}});