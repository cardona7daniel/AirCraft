import { combineReducers } from 'redux';
import airCraft from './aircraft/reducer';

export default combineReducers({
  home: (state = 'Test') => state,
  airCraft,
});
