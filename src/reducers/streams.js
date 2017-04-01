import {
  SELECT_STREAM, INVALIDATE_STREAM,
  REQUEST_STREAMS, RECEIVE_STREAMS
} from '../actions'

export const selectedStream = (state = 'starcraft', action) => {
  switch (action.type) {
    case SELECT_STREAM:
      return action.stream
    default:
      return state
  }
}

const streams = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_STREAM:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_STREAMS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_STREAMS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.streams,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export const streamsByStream = (state = {}, action) => {
  switch (action.type) {
      case INVALIDATE_STREAM:
      case RECEIVE_STREAMS:
      case REQUEST_STREAMS:
        return Object.assign({}, state, {
          [action.stream]: streams(state[action.stream], action)
        })
      default:
        return state
  }
}
