import fetch from 'isomorphic-fetch'

/* let nextStreamId = 0
export const addStream = (name) => ({
  type: 'ADD_STREAM',
  id: nextStreamId++,
  name
}) */

export const SELECT_STREAM = 'SELECT_STREAM'
export const selectStream = (stream) => ({
  type: SELECT_STREAM,
  stream
})

export const INVALIDATE_STREAM = 'INVALIDATE_STREAM'
export const invalidateStream = (stream) => ({
  type: INVALIDATE_STREAM,
  stream
})

export const REQUEST_STREAMS = 'REQUEST_STREAMS'
const requestStreams = (stream) => ({
  type: REQUEST_STREAMS,
  stream
})

export const RECEIVE_STREAMS = 'RECEIVE_STREAMS'
const receiveStreams = (stream, json) => ({
  type: RECEIVE_STREAMS,
  stream,
  streams: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchStreams = (stream) => {
  return (dispatch) => {
    dispatch(requestStreams(stream))

    return fetch(`https://api.twitch.tv/kraken/search/streams?query=${stream}`)
      .then(response => {
        if (response.status >= 400) {
          console.log(response)
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(json =>
        dispatch(receiveStreams(stream, json))
      )
  }
}

const shouldFetchStreams = (state, stream) => {
  const streams = state.streamsByStream[stream]
  if (!streams) {
    return true
  } else if (streams.isFetching) {
    return false
  } else {
    return streams.didInvalidate
  }
}

export const fetchStreamsIfNeeded = (stream) => {
  return (dispatch, getState) => {
    if (shouldFetchStreams(getState(), stream)) {
      return dispatch(fetchStreams(stream))
    } else {
      return Promise.resolve()
    }
  }
}
