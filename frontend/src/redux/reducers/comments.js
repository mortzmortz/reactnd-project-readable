import { normalizeById } from 'utils/utils';
import {
  FETCH_POST_COMMENTS,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_FAILURE,
  UPDATE_COMMENT,
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
    default:
      return state;
  }
};

export default comments;
