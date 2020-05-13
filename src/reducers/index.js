import { combineReducers } from 'redux';
import user from './login';
import courses from './courses';
import filter from './filter';

const rootReducer = combineReducers({
  user,
  courses,
  filter,
});

export default rootReducer;
