webpackJsonp([2],{131:function(t,e){},148:function(t,e,a){"use strict";var o,n=a(0),i=a.n(n),s=a(25),r=a(149),c=a(150),l=a(151),p=a(131),_=a.n(p),h=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])},function(t,e){function a(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}),u=function(t){function e(e){var a=t.call(this,e)||this;return a.state={data:[],cols:a.props.options.map,ck:!1,pageOption:{index:a.props.options.pageOption.index?a.props.options.pageOption.index:1,size:a.props.options.pageOption.size?a.props.options.pageOption.size:10,count:0,total:0}},a.option=a.props.options,a.analysis=a.option.analysis,a.showCk=!!a.option.showCk,a.actions=a.option.actions,a.getUrl=a.option.getUrl,a.noticeChangeCols=a.noticeChangeCols.bind(a),a.accpetHBNotice=a.accpetHBNotice.bind(a),a.goToIndex=a.goToIndex.bind(a),a.prev=a.prev.bind(a),a.next=a.next.bind(a),a.getCheckedItems=a.getCheckedItems.bind(a),a.originCols=s.a.object.deepArrayClone(a.props.options.map),a}return h(e,t),e.prototype.componentDidMount=function(){this.getData(this.state.pageOption.index)},e.prototype.getData=function(t){var e=this;t||(t=1);var a=this.getUrl();if(""!==a){var o=-1===a.indexOf("?")?"?":"&",n=this.state.pageOption.size;a+=o+this.option.pageOption.indexKey+"="+t+"&"+this.option.pageOption.sizeKey+"="+n,s.a.ajaxServer.doFetch(a,"get",null).then(function(a){var o={};if(o=e.analysis?e.analysis(a):a,(o=e.analysis(a)).data&&o.data instanceof Array&&0!=o.data.length){var i=s.a.arrayServer.addPrimaryAndCk(o.data),r=-1;r=parseInt(o.count)%n==0?parseInt(o.count)/n:parseInt(parseInt(o.count)/n)+1,e.setState({ck:!1,data:i,pageOption:{index:t,count:i.length,total:r,size:n}})}else console.log("检查analysis, getUrl, pageOption参数!")})}},e.prototype.getCheckedItems=function(){return this.state.data&&this.state.data instanceof Array?this.state.data.filter(function(t,e,a){return t.ck}):[]},e.prototype.getParams=function(){return{index:this.state.pageOption.index,data:this.state.data}},e.prototype.search=function(t){t?this.getData(this.state.pageOption.index):this.getData()},e.prototype.noticeChangeCols=function(t){this.setState({cols:t})},e.prototype.accpetHBNotice=function(t,e){if(t&&(this.state.data.map(function(e){e.ck=t.ck}),this.setState({data:this.state.data,ck:t.ck})),e){var a=s.a.arrayServer.getCheckedItems(e.data,"__tmpId").items.length==this.state.data.length;this.setState({data:e.data,ck:a})}},e.prototype.next=function(){if(!(this.state.pageOption.index>=this.state.pageOption.count)){var t=this.state.pageOption.index;t++,this.getData(t)}},e.prototype.prev=function(){if(!(this.state.pageOption.index<=1)){var t=this.state.pageOption.index;t--,this.getData(t)}},e.prototype.goToIndex=function(t){this.getData(t)},e.prototype.getBodyComp=function(){return 0==this.state.data.length?i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",null," data is null "))):i.a.createElement(c.a,{actions:this.actions,data:this.state.data,cols:this.state.cols,accpetHBNotice:this.accpetHBNotice,showCk:this.showCk})},e.prototype.getPagingComp=function(){return 0==this.state.data.length?i.a.createElement("div",null,"data is null"):i.a.createElement(l.a,{goNext:this.next,goPrev:this.prev,goIndex:this.goToIndex,options:this.state.pageOption})},e.prototype.getHeaderComp=function(){return this.state.cols&&this.state.cols instanceof Array!=0&&0!=this.state.cols.length?i.a.createElement(r.a,{originCols:this.originCols,accpetHBNotice:this.accpetHBNotice,noticeChangeCols:this.noticeChangeCols,ck:this.state.ck,actions:this.actions,cols:this.state.cols,showCk:this.showCk}):i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("td",null," data is null ")))},e.prototype.render=function(){return i.a.createElement("div",{className:_.a.panel_table+" text-center"},i.a.createElement("div",{className:_.a.overflow_table},i.a.createElement("table",{className:"table table-bordered table-sm"},this.getHeaderComp(),this.getBodyComp())),this.getPagingComp())},e}(i.a.Component);e.a=u},149:function(t,e,a){"use strict";var o,n=a(0),i=a.n(n),s=a(25),r=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])},function(t,e){function a(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}),c=function(t){function e(e){var a=t.call(this,e)||this;return a.setAll=a.setAll.bind(a),a.showChangeColsDialog=a.showChangeColsDialog.bind(a),a.defaultCols=s.a.arrayServer.addPrimaryAndCk(a.props.originCols,!0),a.itemCheckChange=a.itemCheckChange.bind(a),a.showCk=a.props.showCk,a.actions=a.props.actions,a.ck=a.props.ck,a.originCols=a.props.originCols,a.cols=a.props.cols,a.chooseColsKey=Math.ceil(1e9*Math.random()),a}return r(e,t),e.prototype.shouldComponentUpdate=function(t,e){var a=this.ck==t.ck;return!(s.a.object.equalsObject(this.cols,t.cols)&&a)},e.prototype.componentWillReceiveProps=function(t){},e.prototype.setAll=function(){this.props.accpetHBNotice({ck:!this.ck},null)},e.prototype.colsLen=function(){var t=this,e=[];return this.defaultCols.map(function(a,o){e.push(i.a.createElement("p",{key:Math.random()},i.a.createElement("input",{type:"checkbox",defaultChecked:a.ck,onClick:function(e){t.itemCheckChange(a,e)}}),i.a.createElement("span",null,a.val)))}),e},e.prototype.itemCheckChange=function(t,e){t.ck=!t.ck,e.target.checked=t.ck},e.prototype.reSetCols=function(){var t=s.a.arrayServer.getCheckedItems(this.defaultCols).items;0!=t.length&&this.props.noticeChangeCols(t)},e.prototype.getDialogHTML=function(){var t=this;return[i.a.createElement("div",{key:Math.random(),className:"colsModal",ref:this.chooseColsKey},this.colsLen(),i.a.createElement("div",{className:"bot"},i.a.createElement("button",{ref:this.colsBtnCalcelKey,className:"btn btn-sm btn-light",onClick:this.showChangeColsDialog},"取消"),i.a.createElement("button",{ref:this.colsBtnSaveKey,className:"btn btn-sm btn-info",onClick:function(e){return t.reSetCols()}},"确定")))]},e.prototype.showChangeColsDialog=function(){"block"==this.refs[this.chooseColsKey].style.display?this.refs[this.chooseColsKey].style.display="none":this.refs[this.chooseColsKey].style.display="block"},e.prototype.getHeaderHTML=function(){var t=this,e=[];return this.showCk&&e.push(i.a.createElement("th",{className:"text-center",key:Math.random()},i.a.createElement("input",{checked:this.ck,type:"checkbox",onChange:this.setAll}))),this.actions&&0!=this.actions.length&&e.push(i.a.createElement("th",{className:"text-center",key:Math.random(),className:"thCols"},"操作")),this.cols.map(function(a,o){0==o?e.push(i.a.createElement("th",{key:Math.random(),className:"oneTh"},i.a.createElement("i",{className:"icon icon-tuichu",onClick:t.showChangeColsDialog}),a.val,t.getDialogHTML())):e.push(i.a.createElement("th",{key:Math.random()},a.val))}),e},e.prototype.render=function(){return this.cols=this.props.cols,this.ck=this.props.ck,console.log("%crender header","color:red"),i.a.createElement("thead",{className:"thead-dark"},i.a.createElement("tr",null,this.getHeaderHTML()))},e.prototype.componetWillUnmount=function(){},e}(i.a.Component);e.a=c},150:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_react__=__webpack_require__(0),__WEBPACK_IMPORTED_MODULE_0_react___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__),__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__=__webpack_require__(25),__extends=this&&this.__extends||(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])},function(t,e){function a(){this.constructor=t}extendStatics(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}),extendStatics,Body=function(_super){function Body(t){var e=_super.call(this,t)||this;return e.showCk=e.props.showCk,e.actions=e.props.actions,e.selectRow=e.selectRow.bind(e),e.data=e.props.data,e.cols=e.props.cols,e.oldData=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.object.cloneObj(e.props.data),e}return __extends(Body,_super),Body.prototype.shouldComponentUpdate=function(t,e){var a=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.object.equalsObject(this.oldData,t.data),o=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.object.equalsObject(this.cols,t.cols);return!(a&&o)},Body.prototype.componentWillReceiveProps=function(t){},Body.prototype.getCeilHTML=function(row){var col=[];if(this.showCk&&col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{defaultChecked:row.ck,type:"checkbox"}))),this.actions&&0!=this.actions.length){var tmp_1=[];this.actions.map(function(t){tmp_1.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button",{className:"btn btn-link",key:Math.random(),onClick:function(e){return t.action(row)}},t.val))}),col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},tmp_1))}return this.cols.map(function(item){var key=item.key,val="";if("boolean"==typeof row[key])val=row[key].toString();else{var v="row."+item.key,tmp=eval("("+v+")");if(void 0==tmp)val="";else{var type=item.type;if(type)switch(type=type.toLowerCase(),type){case"date":val=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.date.date(tmp);break;case"datetime":val=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.date.dateTime(tmp);break;case"time":val=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.date.time(tmp);break;default:val=tmp}else val=tmp}}item.convert&&item.action?col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{onClick:function(t){return item.action(row,item)}},item.convert(row,item)))):item.convert&&!item.action?col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},item.convert(row,item))):!item.convert&&item.action?col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{onClick:function(t){return item.action(row,item)}},val))):col.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td",{key:Math.random()},val))}),col},Body.prototype.selectRow=function(t,e){e.ck=!e.ck,this.props.accpetHBNotice(null,{data:this.data})},Body.prototype.getBodyHTML=function(){var t=this,e=[];return this.data.map(function(a){e.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("tr",{key:Math.random(),onClick:function(e){return t.selectRow(e,a)}},t.getCeilHTML(a)))}),e},Body.prototype.render=function(){return this.data=this.props.data,this.cols=this.props.cols,this.oldData=__WEBPACK_IMPORTED_MODULE_1__tools_util_jsx__.a.object.cloneObj(this.props.data),console.log("%crender body","color:blue"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("tbody",null,this.getBodyHTML())},Body}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);__webpack_exports__.a=Body},151:function(t,e,a){"use strict";var o,n=a(0),i=a.n(n),s=a(131),r=a.n(s),c=a(25),l=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])},function(t,e){function a(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}),p=function(t){function e(e){var a=t.call(this,e)||this;return a.goIndex=a.goIndex.bind(a),a.pprev=a.pprev.bind(a),a.pnext=a.pnext.bind(a),a.goIndexKey=Math.ceil(1e8*Math.random()),a}return l(e,t),e.prototype.shouldComponentUpdate=function(t,e){return!c.a.object.equalsObject(this.props.options,t.options)},e.prototype.componentWillReceiveProps=function(t){this.setState({options:t.options})},e.prototype.pprev=function(){this.props.goPrev()},e.prototype.pnext=function(){this.props.goNext()},e.prototype.goIndex=function(){this.props.goIndex(this.refs[this.goIndexKey].value)},e.prototype.render=function(){console.log("%c render paging","color:green");this.props.options.index;var t=this.props.options.count;this.props.options.total;return i.a.createElement("div",{className:r.a.paging+" pageNumCls"},i.a.createElement("nav",{"aria-label":"Page navigation example"},i.a.createElement("ul",{className:"pagination"},i.a.createElement("li",{className:"page-item",onClick:this.pprev},i.a.createElement("a",{className:"page-link",href:"#"},"Previous")),i.a.createElement("li",{className:"page-item"},i.a.createElement("a",{className:"page-link",href:"#"},"共",t,"条")),i.a.createElement("li",{className:"page-item"},i.a.createElement("a",{className:"page-link",href:"#"},"当前弟")),i.a.createElement("li",{className:"page-item"},i.a.createElement("a",{className:"page-link",href:"#"},"1/2")),i.a.createElement("li",{className:"page-item"},i.a.createElement("a",{className:"page-link",href:"#"},"页")),i.a.createElement("li",{className:"page-item",onClick:this.pnext},i.a.createElement("a",{className:"page-link",href:"#"},"Next")),i.a.createElement("li",{className:"page-item"},i.a.createElement("a",{className:"page-link",href:"#"},"到")),i.a.createElement("li",{className:"page-item"},i.a.createElement("input",{type:"text",ref:this.goIndexKey,className:"form-control input-sm",style:{width:"60px"},placeholder:"第几页"})),i.a.createElement("li",{className:"page-item",onClick:this.goIndex.bind(this)},i.a.createElement("a",{className:"page-link",href:"#"},"确定")))))},e.prototype.componetWillUnmount=function(){this.goIndexKey=null},e}(i.a.Component);e.a=p},99:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,n=a(0),i=a.n(n),s=a(148),r=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])},function(t,e){function a(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}),c=function(t){function e(e){var a=t.call(this,e)||this;return a.action=a.action.bind(a),a.convert=a.convert.bind(a),a.edit=a.edit.bind(a),a.run=a.run.bind(a),a.change=a.change.bind(a),a.search=a.search.bind(a),a.tableOptions={actions:[{key:"edit",val:"修改",action:a.edit},{key:"run",val:"Run",action:a.run}],showCk:!0,map:[{key:"describe",val:"测试用例描述",action:a.action},{key:"operator",val:"操作人",convert:a.convert},{key:"operator",val:"操作人2",convert:a.convert,action:a.action},{key:"runTime",val:"操作时间",type:"date"},{key:"runTime",val:"操作时间1",type:"datetime"},{key:"runTime",val:"操作时间2",type:"time"},{key:"items.length",val:"用例个数"}],getUrl:function(){return"/api/at/list?describe="},pageOption:{sizeKey:"size",indexKey:"index",index:1,size:10},analysis:function(t){return{data:t.data.data,count:t.data.count}}},a}return r(e,t),e.prototype.edit=function(t){alert("edit "+t._id)},e.prototype.run=function(t){alert("run "+t._id)},e.prototype.action=function(t,e){alert(t._id)},e.prototype.convert=function(t,e){return"aaa"==t.operator?"管理员":t.operator},e.prototype.change=function(){var t=this.refs.tk.getCheckedItems();console.log("selected items is "+t)},e.prototype.search=function(){this.refs.tk.search()},e.prototype.render=function(){return i.a.createElement("div",null,i.a.createElement("input",{type:"button",onClick:this.change,value:"get"}),i.a.createElement("input",{type:"button",onClick:this.search,value:"search"}),i.a.createElement(s.a,{ref:"tk",options:this.tableOptions}))},e}(i.a.Component);e.default=c}});