import * as types from 'redux/types';

// posts
export const fetchPosts = posts => ({
  type: types.FETCH_POSTS,
  payload: posts,
});
