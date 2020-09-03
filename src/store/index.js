import { createStore } from 'redux'
import reducer from './reducers'

export default {
  create () {
    return createStore(reducer.combine())
  }
}
