import * as types from 'redux/types';
import { getData } from 'server';

// posts
export const fetchCategories = request => ({
  type: types.FETCH_CATEGORIES,
  payload: request,
});

export const fetchCategoriesSuccess = posts => {
  return {
    type: types.FETCH_CATEGORIES_SUCCESS,
    payload: posts,
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

export const setCurrentCategory = category => {
  return {
    type: types.SET_CURRENT_CATEGORY,
    payload: category,
  };
};
