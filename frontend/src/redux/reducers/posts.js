import { normalizeById } from 'utils/utils';
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_ACTIVE_POST,
  FETCH_ACTIVE_POST_SUCCESS,
  FETCH_ACTIVE_POST_FAILURE,
  RESET_ACTIVE_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from 'redux/actions/posts';

const initialState = {
  byId: {},
  active: null,
  isFetching: false,
  error: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        byId: {},
        isFetching: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        byId: normalizeById(action.payload),
        isFetching: false,
        error: null,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case FETCH_ACTIVE_POST:
      return {
        ...state,
        active: null,
        isFetching: true,
        error: null,
      };
    case FETCH_ACTIVE_POST_SUCCESS:
      return {
        ...state,
        active: action.payload.id,
        isFetching: false,
        error: null,
      };
    case FETCH_ACTIVE_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case RESET_ACTIVE_POST:
      return {
        ...state,
        active: null,
        isFetching: false,
        error: null,
      };

    case ADD_POST:
      const newPost = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [newPost.id]: newPost,
        },
      };
    case DELETE_POST:
      const postToDelete = action.payload;
      return {
        ...state,
        byId: Object.values(state.byId).filter(
          post => (post.id !== postToDelete.id ? post : postToDelete)
        ),
      };
    case UPDATE_POST:
      const updatedPost = action.payload;
      return {
        ...state,
        byId: Object.values(state.byId).map(
          post => (post.id !== updatedPost.id ? post : updatedPost)
        ),
      };
    default:
      return state;
  }
};

export default posts;
