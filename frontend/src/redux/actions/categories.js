import { getData } from 'server';
import * as types from '../types';

// posts
export const fetchCategories = () => ({
  type: types.FETCH_CATEGORIES,
});

export const fetchCategoriesSuccess = categories => {
  return {
    type: types.FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const fetchCategoriesFailure = error => {
  return {
    type: types.FETCH_CATEGORIES_FAILURE,
    payload: error,
  };
};

export const getAllCategories = () => dispatch => {
  dispatch(fetchCategories());
  getData('/categories')
    .then(response =>
      dispatch(fetchCategoriesSuccess(response.data.categories))
    )
    .catch(error => dispatch(fetchCategoriesFailure(error)));
};

export const setActiveCategory = category => {
  return {
    type: types.SET_ACTIVE_CATEGORY,
    payload: category,
  };
};
