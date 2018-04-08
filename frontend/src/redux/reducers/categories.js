import { normalize } from 'utils/utils';
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SET_ACTIVE_CATEGORY,
} from 'redux/actions/categories';

const initialState = {
  byName: {},
  isFetching: false,
  error: null,
  active: null,
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        byName: {},
        error: null,
        isFetching: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        byName: normalize(action.payload, state.byName, 'name'),
        error: null,
        isFetching: false,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        byName: {},
        error: action.payload,
        isFetching: false,
      };
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
};

export default categories;
