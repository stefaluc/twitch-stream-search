export default(state = [], payload) => {
  switch (payload.type) {
    case 'ADD_STREAM':
      return [...state, payload.item];
    default:
      return state;
  }
};
