
//reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  };
};

//statless component
const CounterComponent = ({value, onIncrement, onDecrement}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const {createStore} = Redux; //ES6
//var createStore = Redux.createStore; ES5
//import {createStore} from 'redux'; //if use npm

const store = createStore(counterReducer);//createStore

// console.log(store.getState());
// store.dispatch({type: 'INCREMENT'});
// console.log(store.getState());

//store.diapatch是改变state唯一途径；每点击一次，state都＋1
const renderFunc = () => {
  ReactDOM.render(
    <CounterComponent
      value={store.getState()}
      onIncrement={() =>
                   store.dispatch({type: 'INCREMENT'})
                  }
      onDecrement={() =>
                   store.dispatch({type: 'DECREMENT'})
                  }
     />,
    document.getElementById('app')
  )
};

//订阅renderFunc，store每次改变后调用上面的renderFunc函数
store.subscribe(renderFunc);
renderFunc();//初次renderFunc，将0输出
