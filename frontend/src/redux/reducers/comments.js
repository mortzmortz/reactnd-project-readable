import { normalizeById } from 'utils/utils';
import {
  FETCH_POST_COMMENTS,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_FAILURE,
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
        comments: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default comments;
