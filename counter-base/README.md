

### 一、《counter-base》redux最简单的例子
ES6代码查看counter_es6.js，在线源码地址：https://jsbin.com/niliqeg/edit?html,js,output   <br />
index.html中的javascript部分是counter_es6.js转译后代码

* 1、唯一的store = createStore(counterReducer);
* 2、修改state唯一途径：store.dispatch({type: typeAction});(作用相当于调用counterReducer)
* 3、订阅事件，store.subscribe(renderFunc);store每次改变后都会触发renderFunc函数
