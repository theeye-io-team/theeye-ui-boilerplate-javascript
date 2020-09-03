import { combineReducers } from 'redux'
import tags from './tags'
import session from './session'
import document from './document'
import counter from './counter'

export default {
  combine () {
    return combineReducers({
      counter,
      tags,
      session ,
      document
    })
  }
}
