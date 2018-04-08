import { getData } from 'server';

export const FETCH_POST_COMMENTS = '[comments] Fetch';
export const FETCH_POST_COMMENTS_SUCCESS = '[comments] Fetch Success';
export const FETCH_POST_COMMENTS_FAILURE = '[comments] Fetch Error';

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

// export const voteComment = (commentId, option) => dispatch => {
//   postData(`/comments/${commentId}`, { option }).then(response =>
//     dispatch(receiveComment(response.data))
//   );
// };
