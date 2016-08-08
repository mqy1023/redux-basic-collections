## redux几个实例

### 《一》、《counter-base》redux最简单的例子
ES6代码查看counter_es6.js，在线源码地址：https://jsbin.com/niliqeg/edit?html,js,output   <br />
index.html中的javascript部分是counter_es6.js转译后代码

* 1、唯一的store = createStore(counterReducer);
* 2、修改state唯一途径：store.dispatch(action);(作用相当于调用counterReducer)
* 3、订阅事件，store.subscribe(renderFunc);state每次改变后都会触发renderFunc函数

### 《二》、《react-redux-counter》react+redux简单的例子
ES6代码查看counter_es6.js，在线源码地址：https://jsbin.com/jerebo/105/edit?html,js,output  <br />
index.html中的javascript部分是counter_es6.js转译后代码

* 1、stateless component无状态组件
* 2、react＋redux

### 《三》、《simplest-redux-example》
react-redux完整版最简单入门实例

### 《四》、《todos》
redux完整版实例

* **

## 【总结】理解redux

### 《一》、理解action

作用：action装载着应用的数据信息(类型+数据)，通过dispatch到reducer返回新的state，同步到store的树结构中，通知组件进行更新 <br />
Dispatching an action is like sending a message to the store saying that something happened and that the store should update itself in response.
```javascript
//action creators
export const addTodo = (item) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    item
  }
}
```
### 《二》、理解store
在redux中一个应用只有唯一的object类型store保持着整个应用的state <br/>
应用(application)中任意容器组件(container components)都可以直接访问store <br/>
容器组件中可以调用store中三个方法如下：
* 2、通过getState()获取当前state
* 3、通过dispatch(action) 到store，dispatch用来触发改变state
* 4、通过subscribe(listener)注册监听事件到store中，state发生改变会被通知重新渲染

### 《三》、理解reducer(Inside the Store: Reducer functions)
reducer函数作用就是根据原state和dispatch的一个action来计算出新的state，类似Array中的reduce

#### 一、理解reducer之一(state更新)
* 1、在组件改变state状态时，我们用的时setState()方法而不是this.state.xxx = yyy;来重新更新state状态
* 2、state状态更新不能涉及到改变原来的state
比如之前曾碰到this.setState({myState: this.state.myState.concat(1)}); <br/>
而不是this.setState({myState: this.state.myState.push(1)}); <br/>
当然你得知道到push会改变原数据，而concat会拷贝一份后，在新数据上操作，即不会改变原数据 <br/>

* 3、redux中reducer函数功能就是将原state拷贝一份后并更新成新的state，即该函数中特别得注意到不能改变原state
下面是几种正确更新state方法收集：(x 和 xx 和 xxx 表示同效果的不同写法) <br/>
a、给数组添加数据 <br/>
```javascript
1、this.setState({myState: this.state.myState.concat(1)});
11、[...myState, 1];
```
b、删除数组中某个index的数据 <br/>
```javascript
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
c、操作数组中某个index元素：… ＋slice <br/>
```javascript
//让该index下的数据＋1
const listFunc = (objList, index) => {
  return [...objList.slice(0, index),
          objList[index] + 1,
          ...objList.slice(index+1)
  ];
};
```
**d、更新object对象** <br/>
```javascript
//不改变原对象1, 仅改变对象中completed的值
const toggleFunc = (objC) => {
  return Object.assign({}, objC, {completed: !objC.completed});
};

//不改变原对象2, 仅改变对象中completed的值
const toggleFuncc = (objD) => {
  return {...objD, completed: !objD.completed};
};
```
e、新增一个object对象 <br/>
```javascript
const addFunc = (obj) => {
  return {id: obj.id, completed: false};
};
```
#### 二、理解reducer之二(理解combineReducers)
* 1、redux中的combineReducers最终写法：<br/>
```javascript
import { combineReducers } from 'redux'
const todoApp = combineReducers({
  todos,
  visibilityFilter
})
```
* 2、reducer中combineReducers精简源码分析 <br/>
```javascript
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](
        state[key],
        action
      );
      return nextState;
    }, {});
  };
};
```

### 《四》、理解redux之其他
#### 一、ES6语法相关 <br/>
a、父组件传递props属性之... <br/>
```javascript
<TodoApp todos={store.getState().todos}
	visibilityFilter={store.getState().visibilityFilter}/>
//可写成
<TodoApp {...store.getState()} />
```
b、{}的使用 <br/>
```javascript
const {todos, visibilityFilter} = this.props;
//相当于
const todos = this.props.todos;
const visibilityFilter = this.props.visibilityFilter;
```
#### 二、React bindings	for	Redux
“react-redux”库提供两个如下方法使得更容易、更直接连接react组件和Redux store
* 1、Provider
用Provider组件包裹的应用，使得每个由connect创建的容器组件对接上同一个store<br/>
```javascript
//Provider精简源码（渲染子组件，传递子context）
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
};
Provider.childContextTypes = {
  store: React.PropTypes.object
};
```
* 2、connect
用connect方法将mapping对应store树结构中state和dispatch的calls到子组件的props<br/>
a、mapStateToProps：该函数返回值是从store中的取出需要的部分state，然后通过props传递给组件，即将store合并(map)到props中<br/>
b、mapDispatchToProps：容器组件往下传递回调的callback，callback函数将触发执行完dispatch调度actions。所以该函数中需写各种方法(methods)合并(map)到props中往下传递

当不需要从父组件传递props可以见简写如下：<br/>
```javascript
//== 1、原始写法
AddTodo = connect(
  state => {
    return {}
  }, dispatch => {
    return { dispatch }
  })(AddTodo);
// == 11、简单方法，即state的default值是{}，dispatch的default的值是{dispatch}
// AddTodo = connect(null, null)(AddTodo);
// == 111、最终写法
AddTodo = connect()(AddTodo);
```
#### 三、Applying	a	Middleware中间件
```javascript
//bankStore.js
import { createStore, applyMiddleware } from 'redux'
import bankReducer from './bankReducer';

const logger = (store) => (next) => (action) => {
 console.log('dispatching:', action);
 return next(action);
}
const bankStore = createStore(
 bankReducer,
 applyMiddleware(logger) // enhance the store with the logger middleware
);
export default bankStore;
```
