let nextStreamId = 0
export const addStream = (name) => {
  return {
    type: 'ADD_STREAM',
    id: nextStreamId++,
    name
  }
}
