import { pageNumber, selectedStream, streamsByStream } from './streams';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  streamsByStream,
  selectedStream,
  pageNumber
});

export default rootReducer;
