import { selectedStream, streamsByStream } from './streams';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  streamsByStream,
  selectedStream
});

export default rootReducer;
