import { normalize } from 'utils/utils';
import * as types from '../types';

const initialState = {
  byName: {},
  isFetching: false,
  error: null,
  active: null,
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES:
      return {
        ...state,
        byName: {},
        error: null,
        isFetching: true,
      };
    case types.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        byName: normalize(action.payload, state.byName, 'name'),
        error: null,
        isFetching: false,
      };
    case types.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        byName: {},
        error: action.payload,
        isFetching: false,
      };
    case types.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
};

export default categories;
