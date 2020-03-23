import { UPDATE_MEDIA } from '../actions/types';
import { DATA } from '../constants/data';

const INITIAL_STATE = {
  mediaList: null,
  currentlyPlaying: null
};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case UPDATE_MEDIA:
      return action.payload;
    default:
      return state;
  }
}
