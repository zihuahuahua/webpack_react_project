import { createStore, combineReducers } from 'redux';
import { data } from './reduce.order'

const Add = combineReducers({
  data
})
export default createStore(Add)