
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

const {createStore} = Redux; //ES6
//var createStore = Redux.createStore;
//import {createStore} from 'redux'; //if use npm

const store = createStore(counterReducer);

// console.log(store.getState());
// store.dispatch({type: 'INCREMENT'});
// console.log(store.getState());

const renderFunc = () => {
  document.body.innerText = store.getState();
};

//订阅renderFunc，store每次改变后调用上面的renderFunc函数
store.subscribe(renderFunc);
renderFunc();//初次renderFunc，将0输出

//store.diapatch是改变state唯一途径；每点击一次，state都＋1
document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
});
