import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

// // combineReducers原始方法
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(
//         state.visibilityFilter,
//         action
//     )
//   }
// }

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
