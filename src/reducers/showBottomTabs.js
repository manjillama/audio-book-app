import { TOGGLE_TABS } from '../actions/types';

export default function(state = true, action){
  switch (action.type) {
    case TOGGLE_TABS:
      return action.payload;
    default:
      return state;
  }
}
