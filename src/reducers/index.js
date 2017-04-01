import { selectedStream, streamsByStream } from './streams';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  selectedStream,
  streamsByStream
});

export default rootReducer;
