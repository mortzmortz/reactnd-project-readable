import { normalizeById } from 'utils/utils';
import * as types from '../types';

const initialState = {
  byId: {},
  isFetching: false,
  error: false,
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POST_COMMENTS:
      return {
        ...state,
        byId: {},
        isFetching: true,
      };
    case types.FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        byId: normalizeById(action.payload),
        isFetching: false,
        error: null,
      };
    case types.FETCH_POST_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case types.UPDATE_COMMENT:
      const updatedComment = action.payload;
      const updatedComments = Object.values(state.byId).map(
        post => (post.id !== updatedComment.id ? post : updatedComment)
      );
      return {
        ...state,
        byId: normalizeById(updatedComments),
      };
    case types.RESET_COMMENTS:
      return {
        ...state,
        byId: {},
        isFetching: false,
        error: null,
      };
    case types.ADD_COMMENT:
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
