# redux-basejs

### 一、《counter-base》redux最简单的例子
ES6代码查看counter_es6.js，在线源码地址：https://jsbin.com/niliqeg/edit?html,js,output   <br />
index.html中的javascript部分是counter_es6.js转译后代码

* 1、唯一的store = createStore(counterReducer);
* 2、修改state唯一途径：store.dispatch({type: typeAction});(作用相当于调用counterReducer)
* 3、订阅事件，store.subscribe(renderFunc);store每次改变后都会触发renderFunc函数

### 二、《react-redux-counter》react+redux简单的例子
ES6代码查看counter_es6.js，在线源码地址：https://jsbin.com/jerebo/105/edit?html,js,output  <br />
index.html中的javascript部分是counter_es6.js转译后代码

* 1、stateless component无状态组件
* 2、react＋redux

### **三、state更新**
* 1、在组件改变state状态时，我们用的时setState()方法而不是this.state.xxx = yyy;来重新更新state状态
* 2、state状态更新不能涉及到改变原来的state
比如之前曾碰到this.setState({myState: this.state.myState.concat(1)}); <br/>
而不是this.setState({myState: this.state.myState.push(1)}); <br/>
当然你得知道到push会改变原数据，而concat会拷贝一份后，在新数据上操作，即不会改变原数据 <br/>

* 3、redux中reducer函数功能就是将原state更新成新的state，即该函数中特别呀注意到不能改变原state

下面是几种正确更新state方法收集：(x 和 xx 和 xxx 表示同效果的不同写法) <br/>
a、添加数据
```
1、this.setState({myState: this.state.myState.concat(1)});
11、[...myState, 1];
```

b、删除某个index的数据
```
2、//slice + concat函数
const delIndexFunc = (objC, index) => {
  return objC.slice(0, index)
    .concat(objC.slice(index+1));
};
22、//... + slice
const scdFunc = (objD, index) => {
  return [...objD.slice(0, index),
    ...objD.slice(index+1)];
};
```

c、操作某个元素：… ＋slice
```
//让该index下的数据＋1
const listFunc = (objList, index) => {
  return [...objList.slice(0, index),
          objList[index] + 1,
          ...objList.slice(index+1)
  ];
};
```

**d、object对象**
```
//不改变原对象1, 仅改变对象中completed的值
const toggleFunc = (objC) => {
  return Object.assign({}, objC, {completed: !objC.completed});
};
//不改变原对象2, 仅改变对象中completed的值
const toggleFuncc = (objD) => {
  return {...objD, completed: !objD.completed};
};
```
