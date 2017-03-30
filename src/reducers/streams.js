const stream = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_STREAM':
      return {
        id: action.id,
        name: action.name
      }

    default:
      return state
  }
}

const streams = (state = [], action) => {
  switch (action.type) {
    case 'ADD_STREAM':
      return [
        ...state,
        stream(undefined, action)
      ]

    default:
      return state
  }
}

export default streams
