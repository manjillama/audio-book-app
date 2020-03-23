import { TOGGLE_TABS } from './types';

/*
* Manually hiding the bottom navigation tab when media player bottom sheet is opened
* Just to fix the android bottom tab not getting overlapped by media player bottom sheet smh
*/
export const toggleBottomTabs = bool => dispatch => {
  dispatch({type: TOGGLE_TABS, payload: bool});
};
