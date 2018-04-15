import { normalizeById } from 'utils/utils';
import {
  FETCH_POST_COMMENTS,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_FAILURE,
  UPDATE_COMMENT,
  ADD_COMMENT,
  RESET_COMMENTS,
} from 'redux/actions/comments';

const initialState = {
  byId: {},
  isFetching: false,
  error: false,
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_COMMENTS:
      return {
        ...state,
        byId: {},
        isFetching: true,
      };
    case FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        byId: normalizeById(action.payload),
        isFetching: false,
        error: null,
      };
    case FETCH_POST_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case UPDATE_COMMENT:
      const updatedComment = action.payload;
      const updatedComments = Object.values(state.byId).map(
        post => (post.id !== updatedComment.id ? post : updatedComment)
      );
      return {
        ...state,
        byId: normalizeById(updatedComments),
      };
    case RESET_COMMENTS:
      return {
        ...state,
        byId: {},
        isFetching: false,
        error: null,
      };
    case ADD_COMMENT:
      const newComment = action.payload;
      if (!newComment.id) return state;
      return {
        ...state,
        byId: {
          ...state.byId,
          [newComment.id]: newComment,
        },
      };
    default:
      return state;
  }
};

export default comments;
