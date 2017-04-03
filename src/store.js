import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger()

let middleware = [ thunkMiddleware]
// apply logger in dev env
if (process.env.NODE_ENV !== 'production') {
  let reduxLogger = require('redux-logger')
  const loggerMiddleware = reduxLogger.createLogger()
  middleware = [ ...middlware, loggerMiddleware ]
}

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
}

export default configureStore
