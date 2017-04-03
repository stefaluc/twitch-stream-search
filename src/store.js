import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

let middleware = [ thunkMiddleware ]
// apply logger in dev env
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger()
  middleware = [ ...middleware, loggerMiddleware ]
}

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
}

export default configureStore
