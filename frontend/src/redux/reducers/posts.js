import * as types from 'redux/types';

const initialState = {
  allPosts: [],
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      };
    default:
      return state;
  }
};
