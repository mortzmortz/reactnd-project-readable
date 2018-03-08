import * as types from 'redux/types';

// app
export const addPosts = posts => ({
  type: types.ADD_POSTS,
  payload: posts,
});
