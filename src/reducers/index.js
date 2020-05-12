import { combineReducers } from 'redux';
import user from './login';
import courses from './courses';

const rootReducer = combineReducers({
  user,
  courses,
});

export default rootReducer;
