webpackJsonp([5],{24:function(t,e,n){"use strict";var o=function(){function t(){}return t.getProperties=function(t){var e=[];if(!t||0==t.length)return e;for(var n in t[0])e.push(n);return e},t.doFetch=function(t,e,n){var o=t;"function"==typeof t&&(o=t()),o=-1==o.indexOf("?")?t+"?ran="+Math.random():t+"&ran="+Math.random();var r={method:(e=void 0==e?"get":e).toUpperCase(),credentials:"include",headers:{"Content-Type":"application/json"}};return"post"==e.toLowerCase()&&n&&(r.body=JSON.stringify(n)),fetch(o,r).then(function(t){return t.json()})},t.cloneObj=function(t){return t?JSON.parse(JSON.stringify(t)):null},t.getArrayByTmpIds=function(t,e){var n=[],o=e;return t.map(function(t){o.map(function(e){e.__tmpId==t&&n.push(e)})}),n},t.getArrayByField=function(t,e){var n=[];return e.map(function(e){e[t]&&n.push(e[t])}),n},t.addPrimaryAndCk=function(t,e){return t.map(function(t){e&&(t.ck=!1),t.__tmpId=Math.ceil(1e16*Math.random())}),t},t.setCookie=function(t,e,n){var o=encodeURIComponent(t)+"="+encodeURIComponent(e);n instanceof Date&&(o+="; expires="+n.toGMTString()),document.cookie=o+";path=/;domain="+document.domain},t.getCookie=function(t){var e=document.cookie,n=encodeURIComponent(t)+"=",o=e.indexOf(n),r=null;if(o>-1){var a=e.indexOf(";",o);-1==a&&(a=e.length),r=decodeURIComponent(e.substring(o+n.length,a))}return r},t.removeCookie=function(t){this.setCookie(t,"",new Date(0))},t.equalsObject=function(t,e){var n;for(n in t)if(void 0===e[n])return!1;for(n in t)if(t[n])switch(typeof t[n]){case"object":if(!equals(t[n],e[n]))return!1;break;case"function":if(void 0===e[n]||"equals"!=n&&t[n].toString()!=e[n].toString())return!1;break;default:if(t[n]!=e[n])return!1}else if(e[n])return!1;for(n in e)if(void 0===t[n])return!1;return!0},t}();e.a=o},43:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=n.n(o),a=n(26),i=n.n(a),u=n(54),c=n(13),l=n(94),s=(n.n(l),n(95));i.a.render(r.a.createElement(c.a,{loginUserStore:s.a},r.a.createElement(u.a,null)),document.getElementById("example"))},54:function(t,e,n){"use strict";var o,r=n(0),a=n.n(r),i=n(16),u=n(41),c=n(87),l=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=function(t){function e(e){var n=t.call(this,e)||this;return n.state={routerItems:[]},n.routerMapCtl=new c.a,n.getRouterByData=n.getRouterByData.bind(n),n}return l(e,t),e.prototype.getRouterByData=function(t){return[{path:"/login",exact:!0,component:this.routerMapCtl.getComponentsByName("/login")},{component:this.routerMapCtl.getComponentsByName("/layout"),routes:[{path:"/auto",exact:!0,component:this.routerMapCtl.getComponentsByName("/auto")},{path:"/goods",component:this.routerMapCtl.getComponentsByName("/goods")},{path:"/order",component:this.routerMapCtl.getComponentsByName("/order")},{path:"/user",component:this.routerMapCtl.getComponentsByName("/user")},{path:"/getInput",component:this.routerMapCtl.getComponentsByName("/getInput")},{component:this.routerMapCtl.getComponentsByName("/noMatch")}]}]},e.prototype.componentDidMount=function(){var t=this;window.setTimeout(function(){t.setState({routerItems:t.getRouterByData({})})},0)},e.prototype.render=function(){return a.a.createElement(i.a,null,Object(u.a)(this.state.routerItems))},e}(a.a.Component);e.a=s},87:function(t,e,n){"use strict";var o=n(0),r=n.n(o),a=n(88),i=n.n(a),u=n(89),c=n(93),l=function(){function t(){this.allRouters=[{path:"/layout",comp:u.a},{path:"/login",comp:i()({loader:function(){return n.e(1).then(n.bind(null,96))},loading:function(){return r.a.createElement(c.a,null)}})},{path:"/auto",comp:i()({loader:function(){return n.e(0).then(n.bind(null,42))},loading:function(){return r.a.createElement(c.a,null)}})},{path:"/goods",comp:i()({loader:function(){return n.e(2).then(n.bind(null,97))},loading:function(){return r.a.createElement(c.a,null)}})},{path:"/order",comp:i()({loader:function(){return n.e(4).then(n.bind(null,98))},loading:function(){return r.a.createElement(c.a,null)}})},{path:"/user",comp:i()({loader:function(){return n.e(3).then(n.bind(null,99)).then(function(t){return t.User})},loading:function(){return r.a.createElement(c.a,null)}})}]}return t.prototype.getComponentsByName=function(t){var e=null;return this.allRouters.map(function(n){n.path==t&&(e=n.comp)}),null==e&&(e=i()({loader:function(){return n.e(0).then(n.bind(null,42))},loading:function(){return r.a.createElement(c.a,null)}})),e},t}();e.a=l},89:function(t,e,n){"use strict";var o,r=n(0),a=n.n(r),i=n(16),u=n(90),c=n.n(u),l=n(41),s=n(24),p=n(91),f=n(13),m=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),h=this&&this.__assign||Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},d=this&&this.__decorate||function(t,e,n,o){var r,a=arguments.length,i=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(r=t[u])&&(i=(a<3?r(i):a>3?r(e,n,i):r(e,n))||i);return a>3&&i&&Object.defineProperty(e,n,i),i},y=function(t){function e(e){var n=t.call(this,e)||this;return n.observer=n.props.loginUserStore,n}return m(e,t),e.prototype.logOut=function(){var t=this;s.a.doFetch(ModuleRequestUrl.LOGIN.logout,"post",null).then(function(e){t.observer.setUser(""),t.props.history.push({pathname:"/login"}),s.a.removeCookie(CookieKeys.SHOPUSERNAME)})},e.prototype.render=function(){var t=this;return a.a.createElement("div",{className:c.a.container},a.a.createElement("div",{className:c.a.nav},a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement(i.b,{to:"/goods"},"Goods")),a.a.createElement("li",null,a.a.createElement(i.b,{to:"/order"},"Order")),a.a.createElement("li",null,a.a.createElement(i.b,{to:"/user"},"User")),a.a.createElement("li",null,a.a.createElement(i.b,{to:"/auto"},"Auto Test")),a.a.createElement("li",null,a.a.createElement(i.b,{to:"/getInput"},"getInput")))),a.a.createElement("div",{className:c.a.rightBox},a.a.createElement("div",{className:c.a.top},a.a.createElement("span",null,this.observer.getUserName()),a.a.createElement("span",{className:c.a.logout,onClick:function(e){return t.logOut()}},"退出")),Object(l.a)(this.props.route.routes)))},e=d([Object(f.b)("loginUserStore"),f.c],e)}(a.a.Component),g=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return m(e,t),e.prototype.render=function(){var t=this;return a.a.createElement(p.a,{comp:function(e){return a.a.createElement(y,h({},t.props,{user:e}))}})},e}(a.a.Component);e.a=g},90:function(t,e){},91:function(t,e,n){"use strict";var o,r=n(0),a=n.n(r),i=n(24),u=n(13),c=n(16),l=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=this&&this.__decorate||function(t,e,n,o){var r,a=arguments.length,i=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(r=t[u])&&(i=(a<3?r(i):a>3?r(e,n,i):r(e,n))||i);return a>3&&i&&Object.defineProperty(e,n,i),i},p=function(t){function e(e){var n=t.call(this,e)||this;return n.observer=n.props.loginUserStore,n}return l(e,t),e.prototype.componentWillMount=function(){var t=this;i.a.doFetch("/api/login/check").then(function(e){if(e.rc){var n=e.data.name;i.a.setCookie(CookieKeys.SHOPUSERNAME,n),t.observer.setUser(n)}})},e.prototype.render=function(){var t=i.a.getCookie(CookieKeys.SHOPUSERNAME);return t?this.props.comp({name:t}):a.a.createElement(c.c,{to:"/login"})},e=s([Object(u.b)("loginUserStore"),u.c],e)}(a.a.Component);e.a=p},93:function(t,e,n){"use strict";var o,r=n(0),a=n.n(r),i=this&&this.__extends||(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),u=function(t){function e(e){return t.call(this,e)||this}return i(e,t),e.prototype.render=function(){return a.a.createElement("div",null,"loading")},e}(a.a.Component);e.a=u},94:function(t,e){},95:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var o=n(25),r=this&&this.__decorate||function(t,e,n,o){var r,a=arguments.length,i=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(r=t[u])&&(i=(a<3?r(i):a>3?r(e,n,i):r(e,n))||i);return a>3&&i&&Object.defineProperty(e,n,i),i},a=new(function(){function t(){this.name=""}return t.prototype.setUser=function(t){this.name=t},t.prototype.getUserName=function(){return this.name},r([o.h],t.prototype,"name",void 0),r([o.c],t.prototype,"setUser",null),r([o.c],t.prototype,"getUserName",null),t}())}},[43]);