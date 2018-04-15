import { getData, postData, deleteData, editData } from 'server';

export const FETCH_POST_COMMENTS = '[comments] Fetch';
export const FETCH_POST_COMMENTS_SUCCESS = '[comments] Fetch Success';
export const FETCH_POST_COMMENTS_FAILURE = '[comments] Fetch Error';
export const UPDATE_COMMENT = '[comments] Update';
export const EDIT_COMMENT = '[comments] Edit';
export const ADD_COMMENT = '[comments] Add';
export const RESET_COMMENTS = '[comments] Reset';

export const fetchComments = () => ({
  type: FETCH_POST_COMMENTS,
});

export const fetchCommentsSuccess = comments => {
  return {
    type: FETCH_POST_COMMENTS_SUCCESS,
    payload: comments,
  };
};

export const fetchCommentsFailure = error => {
  return {
    type: FETCH_POST_COMMENTS_FAILURE,
    payload: error,
  };
};

export const getPostComments = postId => dispatch => {
  dispatch(fetchComments());
  getData(`/posts/${postId}/comments`)
    .then(response => dispatch(fetchCommentsSuccess(response.data)))
    .catch(error => dispatch(fetchCommentsFailure(error)));
};

export const deleteComment = commentId => dispatch => {
  deleteData(`/comments/${commentId}`).then(response =>
    dispatch(updateComment(response.data))
  );
};

export const resetComments = () => ({
  type: RESET_COMMENTS,
});

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  payload: comment,
});

export const receiveComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const editComment = (commentId, data) => dispatch => {
  editData(`/comments/${commentId}`, data).then(response =>
    dispatch(updateComment(response.data))
  );
};

export const addComment = data => dispatch => {
  postData('/comments', data).then(response =>
    dispatch(receiveComment(response.data))
  );
};

export const voteComment = (commentId, option) => dispatch => {
  postData(`/comments/${commentId}`, { option }).then(response =>
    dispatch(updateComment(response.data))
  );
};
