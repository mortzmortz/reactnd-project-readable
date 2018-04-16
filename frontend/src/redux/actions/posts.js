import { getData, postData, deleteData, editData } from 'server';
import * as types from '../types';

// Multiple Posts //-----------------------------------------------------------
export const fetchPosts = () => ({
  type: types.FETCH_POSTS,
});

export const fetchPostsSuccess = response => {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    payload: response,
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

// Posts by Category //--------------------------------------------------------
export const getAllPostsByCategory = category => dispatch => {
  dispatch(fetchPosts());
  getData(`/${category}/posts`)
    .then(response => dispatch(fetchPostsSuccess(response.data)))
    .catch(error => dispatch(fetchPostsFailure(error)));
};

// Active Post //--------------------------------------------------------------
export const fetchActivePost = () => ({
  type: types.FETCH_ACTIVE_POST,
});

export const fetchActivePostSuccess = response => {
  return {
    type: types.FETCH_ACTIVE_POST_SUCCESS,
    payload: response,
  };
};

export const fetchActivePostFailure = error => {
  return {
    type: types.FETCH_ACTIVE_POST_FAILURE,
    payload: error,
  };
};

export const getActivePost = postId => dispatch => {
  dispatch(fetchActivePost());
  getData(`/posts/${postId}`)
    .then(
      response =>
        Promise.all[
          (dispatch(fetchActivePostSuccess(response.data)),
          dispatch(updatePost(response.data)))
        ]
    )
    .catch(error => dispatch(fetchActivePostFailure(error)));
};

export const resetActivePost = () => ({
  type: types.RESET_ACTIVE_POST,
});

// Post Actions //-------------------------------------------------------------
export const receivePost = post => ({
  type: types.ADD_POST,
  payload: post,
});

export const updatePost = post => ({
  type: types.UPDATE_POST,
  payload: post,
});

export const addPost = data => dispatch => {
  postData('/posts', data).then(response =>
    dispatch(receivePost(response.data))
  );
};

export const editPost = (postId, data) => dispatch => {
  editData(`/posts/${postId}`, data).then(response =>
    dispatch(updatePost(response.data))
  );
};

export const deletePost = postId => dispatch => {
  deleteData(`/posts/${postId}`).then(response =>
    dispatch(updatePost(response.data))
  );
};

// Vote Actions //-------------------------------------------------------------
export const votePost = (postId, option) => dispatch => {
  postData(`/posts/${postId}`, { option }).then(response =>
    dispatch(updatePost(response.data))
  );
};
