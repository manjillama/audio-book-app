import { UPDATE_MEDIA } from './types';

export const updateMedia = (media, callback) => dispatch => {
  dispatch({type: UPDATE_MEDIA, payload: media});
  if(callback)
    callback();
};
