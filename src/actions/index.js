import fetch from 'isomorphic-fetch'

export const INCREMENT_PAGE = 'INCREMENT_PAGE'
export const incrementPage = () => ({ type: INCREMENT_PAGE })

export const DECREMENT_PAGE = 'DECREMENT_PAGE'
export const decrementPage = () => ({ type: DECREMENT_PAGE })

export const RESET_PAGE_NUMBER = 'RESET_PAGE_NUMBER'
export const resetPageNumber = () => ({ type: RESET_PAGE_NUMBER })

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
  streams: json.streams.map(child => child),
  receivedAt: Date.now()
})

const fetchStreams = (stream) => {
  return (dispatch) => {
    dispatch(requestStreams(stream))

    const payload = {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '8wp5eczr3myb0gzot5u7yyeyv2ixju'
      }
    }
    return fetch(`https://api.twitch.tv/kraken/search/streams?query=${stream}&limit=100`, payload)
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
