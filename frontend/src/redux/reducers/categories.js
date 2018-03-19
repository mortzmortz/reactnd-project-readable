import * as types from 'redux/types';

const initialState = {
  allCategories: [],
  isFetching: false,
  error: null,
  current: null,
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES:
      return {
        ...state,
        allCategories: [],
        error: null,
        isFetching: true,
      };
    case types.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: action.payload,
        error: null,
        isFetching: false,
      };
    case types.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        allCategories: [],
        error: action.payload,
        isFetching: false,
      };
    case types.SET_CURRENT_CATEGORY:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};

export default categories;
