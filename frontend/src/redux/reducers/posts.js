import * as types from 'redux/types';

const initialState = {
  allPosts: [],
  isFetching: false,
  error: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        allPosts: [],
        error: null,
        isFetching: true,
      };
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        allPosts: action.payload,
        error: null,
        isFetching: false,
      };

    case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        allPosts: [],
        error: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default posts;
