import { normalizeById } from 'utils/utils';
import * as types from '../types';

const initialState = {
  byId: {},
  active: null,
  isFetching: false,
  error: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        byId: {},
        isFetching: true,
        error: null,
      };
    case types.FETCH_POSTS_SUCCESS:
      // FIXME: after delete on server, server returns broken post object
      // temporary fix: filter out posts with no id
      const newPosts = action.payload.filter(post => post.id);
      return {
        ...state,
        byId: normalizeById(newPosts),
        isFetching: false,
        error: null,
      };
    case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case types.FETCH_ACTIVE_POST:
      return {
        ...state,
        active: null,
        isFetching: true,
        error: null,
      };
    case types.FETCH_ACTIVE_POST_SUCCESS:
      return {
        ...state,
        active: action.payload.id,
        isFetching: false,
        error: null,
      };
    case types.FETCH_ACTIVE_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case types.RESET_ACTIVE_POST:
      return {
        ...state,
        active: null,
        isFetching: false,
        error: null,
      };

    case types.ADD_POST:
    case types.UPDATE_POST:
      const newPost = action.payload;
      if (!newPost.id) return state;
      return {
        ...state,
        byId: Object.assign(state.byId, { [newPost.id]: newPost }),
      };
    case types.DELETE_POST:
      const postToDelete = action.payload;
      return {
        ...state,
        byId: Object.values(state.byId).filter(
          post => (post.id !== postToDelete.id ? post : postToDelete)
        ),
      };
    default:
      return state;
  }
};

export default posts;
