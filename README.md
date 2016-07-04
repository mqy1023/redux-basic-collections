# redux-basejs

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

## [总结]理解redux

### 一、action

作用：action装载着应用的数据信息(类型+数据)，通过dispatch一个action给store，让reducers根据action来更新state
```
//action creators
export const addTodo = (item) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    item
  }
}
```
### 二、store
在redux中一个应用只有唯一的object类型store保持着整个应用的state
* 持有应用所有的state
* 通过getState()获取当前state
* 通过dispatch(action);来更新state
* 通过subscribe(listener)注册监听事件
* 通过subscribe(listener) return返回处理取消注册listeners

### 三、reducer

#### 一、理解reducer之一(state更新)
* 1、在组件改变state状态时，我们用的时setState()方法而不是this.state.xxx = yyy;来重新更新state状态
* 2、state状态更新不能涉及到改变原来的state
比如之前曾碰到this.setState({myState: this.state.myState.concat(1)}); <br/>
而不是this.setState({myState: this.state.myState.push(1)}); <br/>
当然你得知道到push会改变原数据，而concat会拷贝一份后，在新数据上操作，即不会改变原数据 <br/>

* 3、redux中reducer函数功能就是将原state更新成新的state，即该函数中特别呀注意到不能改变原state

下面是几种正确更新state方法收集：(x 和 xx 和 xxx 表示同效果的不同写法) <br/>
a、给数组添加数据 <br/>
```
1、this.setState({myState: this.state.myState.concat(1)});
11、[...myState, 1];
```
b、删除数组中某个index的数据 <br/>
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
c、操作数组中某个index元素：… ＋slice <br/>
```
//让该index下的数据＋1
const listFunc = (objList, index) => {
  return [...objList.slice(0, index),
          objList[index] + 1,
          ...objList.slice(index+1)
  ];
};
```
**d、更新object对象** <br/>
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
e、新增一个object对象 <br/>
```
const addFunc = (obj) => {
  return {id: obj.id, completed: false};
};
```
#### 二、理解reducer之二(理解combineReducers)
1、redux中的combineReducers最终写法：<br/>
```
import { combineReducers } from 'redux'
const todoApp = combineReducers({
  todos,
  visibilityFilter
})
```
2、reducer中combineReducers精简源码分析 <br/>
```
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

#### 四、理解redux之其他
1、ES6语法相关 <br/>
a、父组件传递props属性之... <br/>
```
<TodoApp todos={store.getState().todos}
	visibilityFilter={store.getState().visibilityFilter}/>
//可写成
<TodoApp {...store.getState()} />
```
b、{}的使用 <br/>
```
const {todos, visibilityFilter} = this.props;
//相当于
const todos = this.props.todos;
const visibilityFilter = this.props.visibilityFilter;
```
2、Provider的解析 <br/>
渲染子组件，传递子context <br/>
```
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
3、connect <br/>

mapStateToProps,mapDispatchToProps；通过react-redux函数提供的connect函数把state和actions转换为组件所需要的props。<br/>
<br/>
当不需要从父组件传递props可以见简写如下：<br/>
```
//==1、原始写法
AddTodo = connect(
  state => {
    return {}
  }, dispatch => {
    return { dispatch }
  })(AddTodo);
// ==11、简单方法，即state的default值是{}，dispatch的default的值是{dispatch}
// AddTodo = connect(null, null)(AddTodo);
// ==111、最终写法
AddTodo = connect()(AddTodo);
```
