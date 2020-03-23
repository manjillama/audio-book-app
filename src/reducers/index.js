import { combineReducers } from 'redux';
import media from './media';
import showBottomTabs from './showBottomTabs';

export default combineReducers({
  media,
  showBottomTabs
});
