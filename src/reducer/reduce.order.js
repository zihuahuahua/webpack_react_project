import { DATATYPE } from './action.order'

export const data = (state = '', action) => {
  if (action.type === DATATYPE.dataName) {
    state = action.state
  }
  return state
}