import * as types from 'redux/types';
import { getData } from 'server';

// posts
export const fetchPosts = request => ({
  type: types.FETCH_POSTS,
  payload: request,
});

export const fetchPostsSuccess = posts => {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchPostsFailure = error => {
  return {
    type: types.FETCH_POSTS_FAILURE,
    payload: error,
  };
};

export const getAllPosts = () => dispatch => {
  dispatch(fetchPosts());
  getData('/posts')
    .then(response => dispatch(fetchPostsSuccess(response.data)))
    .catch(error => dispatch(fetchPostsFailure(error)));
};
