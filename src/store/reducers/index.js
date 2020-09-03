import { combineReducers } from 'redux'
import session from './session'
import counter from './counter'

export default {
  combine () {
    return combineReducers({
      counter,
      session
    })
  }
}
