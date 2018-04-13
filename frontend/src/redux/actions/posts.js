import { getData, postData, deleteData } from 'server';

export const FETCH_POSTS = '[posts] Fetch';
export const FETCH_POSTS_SUCCESS = '[posts] Fetch Success';
export const FETCH_POSTS_FAILURE = '[posts] Fetch Error';
export const FETCH_ACTIVE_POST = '[posts] Fetch Active';
export const FETCH_ACTIVE_POST_SUCCESS = '[posts] Fetch Active Success';
export const FETCH_ACTIVE_POST_FAILURE = '[posts] Fetch Active Error';
export const RESET_ACTIVE_POST = '[posts] Reset Active Post';
export const ADD_POST = '[posts] Add Post';
export const UPDATE_POST = '[posts] Update Post';
export const DELETE_POST = '[posts] Delete Post';
export const RECEIVE_COMMENT = '[posts] Receive Comment';

// Multiple Posts //-----------------------------------------------------------
export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const fetchPostsSuccess = response => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: response,
  };
};

export const fetchPostsFailure = error => {
  return {
    type: FETCH_POSTS_FAILURE,
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
  type: FETCH_ACTIVE_POST,
});

export const fetchActivePostSuccess = response => {
  return {
    type: FETCH_ACTIVE_POST_SUCCESS,
    payload: response,
  };
};

export const fetchActivePostFailure = error => {
  return {
    type: FETCH_ACTIVE_POST_FAILURE,
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
          dispatch(addPost(response.data)))
        ]
    )
    .catch(error => dispatch(fetchActivePostFailure(error)));
};

export const resetActivePost = () => ({
  type: RESET_ACTIVE_POST,
});

// Post Actions //-------------------------------------------------------------
export const addPost = post => ({
  type: ADD_POST,
  payload: post,
});

export const updatePost = post => ({
  type: UPDATE_POST,
  payload: post,
});

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
