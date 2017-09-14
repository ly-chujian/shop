/**
 * Created by wupeng5 on 2017/6/8.
 */


import React from 'react';
import ReactDom from 'react-dom';
import Login from "./modules/login/login.jsx";

ReactDom.render(
    <Login />, document.getElementById('example')
);

//路由的生命周期
//在react-router V4中去掉了on****的路由生命周期的钩子，
//但是可以在组件中用componentDidMount 或 componentWillMount 代替 onEnter，
//可以用componentWillUpdate 或 componentWillReceiveProps 代替 onUpdate，
//可以用componentWillUnmount代替 onLeave。


//componentWillReceiveProps
//组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。

//react渲染过程
//1: es6 --->es5
//   通过babel转换成es5，React.createElement
//2：把render里面的html结构转换成js对象
//{
//    type: 'div',
//        props: {
//    className: 'test',
//        children: []
//    }
//}
//这个对象就是我们说的vdom（虚拟dom）
//3：把所有的虚拟dom渲染成真正的dom树
//var domNode = new ReactDOMComponent( vdom ).mountComponent();
//4：把domNode添加到容器内
//containerDomNode.appendChild( domNode );

//setState变化过程
//setState是异步的过程，简单点说，就是setState后，直接使用this.state, 状态并没有变化, 除非我们放在setTimeout这样的函数里面
//主要思想就是对比当前vdom和之前的vdom，这里面涉及到一个diff算法
//如果tag不一样，那么就删除当前，添加新的tag标签
//如果tag一样，就更新当前标签的attr,其他不变
// div  div  div  ---> div  span  div ----->>>删除第二个div  在第二个位置加入span，1,3不变
// div  div  div  ---> div  span  div div----->>>删除第二个div  在第二个位置加入span，1,3不变,删除2 4
//react加入了key来优化这个操作, 通过key来寻找位置，然后比较, key的含义类似主键

//setState异步过程
//componentDidMount() {
//    this.setState({val: this.state.val + 1});
//    console.log(this.state.val);    // 第 1 次 log
//
//    this.setState({val: this.state.val + 1});
//    console.log(this.state.val);    // 第 2 次 log
//
//    setTimeout(() => {
//        this.setState({val: this.state.val + 1});
//        console.log(this.state.val);  // 第 3 次 log
//
//        this.setState({val: this.state.val + 1});
//        console.log(this.state.val);  // 第 4 次 log
//    }, 0);
//}
//componentDidMount运行结束后，Transaction运行结束，这个时候isBatchingUpdates为false，所有当setTimeout中的setState执行时，直接给刷新了
//在componentDidMount之前，isBatchingUpdates为true
//在settimeout的事件没有预先被react管控，直接执行setstate,这是核心原因
//----->>>>> 0,0,2,3

//<Route exact path={`${this.props.match.url}/info/:id`} component={OthersInfo} />

//shouldComponentUpdate

//箭头函数使得this被绑定在函数定义时的上下文，也就是指向实例组件，所以不需要bind来转换作用域

//BrowserRouter 和  HashRouter
//BrowserRouter 使用 html5 history技术（通过该api改变当前url而不刷新当前页面）实现，不带#号
//html5 history技术, 浏览器提供相应的接口来修改浏览器的历史记录
//HashRouter使用 hash（就是#）, 通过修改地址后面的hash来保存状态, 有2个缺陷
//1:#后面的部分不会被发送到服务器（微信分享失败）
//2:ajax请求的时候会自动忽略

//path = {`${this.props.match.url}/:id`}
//<Route path="/todo" render={()=>{
//    if(this.state.isLogin){
//        return <Todo />;
//    }else{
//        return <Login />
//    }
//}} />