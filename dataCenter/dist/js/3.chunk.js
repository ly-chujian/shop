webpackJsonp([3],{199:function(e,t){},97:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=r(0),n=r.n(o),c=r(199),l=(r.n(c),r(25)),s=r(13),i=this&&this.__extends||(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),m=this&&this.__decorate||function(e,t,r,a){var o,n=arguments.length,c=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,a);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(c=(n<3?o(c):n>3?o(t,r,c):o(t,r))||c);return n>3&&c&&Object.defineProperty(t,r,c),c},p=function(e){function t(t){var r=e.call(this,t)||this;return r.observer=r.props.loginUserStore,r}return i(t,e),t.prototype.login=function(){var e=this,t=this.refs.__loginName.value,r=this.refs.__loginPwd.value;""!=t&&""!=r&&(performanceTool.setStart(),l.a.ajaxServer.doFetch(ModuleRequestUrl.LOGIN.login,"post",{name:t,pwd:r}).then(function(r){performanceTool.compare("LOGIN"),l.a.cookie.setCookie(CookieKeys.SHOPUSERNAME,t),e.observer.setUser(t),e.props.history.push({pathname:"/"})}))},t.prototype.register=function(){l.a.ajaxServer.doFetch(ModuleRequestUrl.LOGIN.register,"post",{name:"a",pwd:"a"})},t.prototype.render=function(){var e=this;return n.a.createElement("div",null,n.a.createElement("div",{className:"black"}),n.a.createElement("div",{className:"loginModal"},n.a.createElement("h4",{className:"text-center loginTitle"},"请登录"),n.a.createElement("div",{className:"form-group row"},n.a.createElement("div",{className:"col-sm-12 my-1"},n.a.createElement("div",{className:"input-group"},n.a.createElement("div",{className:"input-group-prepend"},n.a.createElement("div",{className:"input-group-text"},n.a.createElement("i",{className:"icon icon-yonghu"}))),n.a.createElement("input",{type:"text",className:"form-control form-control-lg",placeholder:"Username",ref:"__loginName"})))),n.a.createElement("div",{className:"form-group row"},n.a.createElement("div",{className:"col-sm-12 my-1"},n.a.createElement("div",{className:"input-group"},n.a.createElement("div",{className:"input-group-prepend"},n.a.createElement("div",{className:"input-group-text"},n.a.createElement("i",{className:"icon icon-mima"}))),n.a.createElement("input",{type:"password",className:"form-control form-control-lg",placeholder:"Password",ref:"__loginPwd"})))),n.a.createElement("div",{className:"form-group row"},n.a.createElement("div",{className:"col-sm-12 my-1"},n.a.createElement("button",{type:"submit",className:"btn btn-primary btn-lg col-sm-12",onClick:function(t){return e.login()}},"登 录")),n.a.createElement("div",{className:"col-sm-12 my-1"},n.a.createElement("button",{type:"submit",className:"btn btn-primary btn-lg col-sm-12",onClick:function(t){return e.register()}},"注 册")))))},t=m([Object(s.b)("loginUserStore"),s.c],t)}(n.a.Component);t.default=p}});