import { getData, postData, deleteData, editData } from 'server';
import * as types from '../types';
import { updatePost } from './posts';

export const fetchComments = () => ({
  type: types.FETCH_POST_COMMENTS,
});

export const fetchCommentsSuccess = comments => {
  return {
    type: types.FETCH_POST_COMMENTS_SUCCESS,
    payload: comments,
  };
};

export const fetchCommentsFailure = error => {
  return {
    type: types.FETCH_POST_COMMENTS_FAILURE,
    payload: error,
  };
};

export const getPostComments = postId => dispatch => {
  dispatch(fetchComments());
  getData(`/posts/${postId}/comments`)
    .then(response => dispatch(fetchCommentsSuccess(response.data)))
    .catch(error => dispatch(fetchCommentsFailure(error)));
};

export const deleteComment = commentId => (dispatch, getState) => {
  deleteData(`/comments/${commentId}`).then(response => {
    const newComment = response.data;
    const { parentId } = newComment;
    const { posts } = getState();
    const postToUpdate = posts.byId[parentId];
    postToUpdate.commentCount--;
    return Promise.all[
      (dispatch(updateComment(newComment)), dispatch(updatePost(postToUpdate)))
    ];
  });
};

export const resetComments = () => ({
  type: types.RESET_COMMENTS,
});

export const updateComment = comment => ({
  type: types.UPDATE_COMMENT,
  payload: comment,
});

export const receiveComment = comment => ({
  type: types.ADD_COMMENT,
  payload: comment,
});

export const editComment = (commentId, data) => dispatch => {
  editData(`/comments/${commentId}`, data).then(response =>
    dispatch(updateComment(response.data))
  );
};

export const addComment = data => (dispatch, getState) => {
  postData('/comments', data).then(response => {
    const newComment = response.data;
    const { parentId } = newComment;
    const { posts } = getState();
    const postToUpdate = posts.byId[parentId];
    postToUpdate.commentCount++;
    return Promise.all[
      (dispatch(receiveComment(newComment)), dispatch(updatePost(postToUpdate)))
    ];
  });
};

export const voteComment = (commentId, option) => dispatch => {
  postData(`/comments/${commentId}`, { option }).then(response =>
    dispatch(updateComment(response.data))
  );
};
