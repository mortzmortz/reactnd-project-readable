import { getData } from 'server';

export const FETCH_CATEGORIES = '[categories] Fetch';
export const FETCH_CATEGORIES_SUCCESS = '[categories] Fetch Success';
export const FETCH_CATEGORIES_FAILURE = '[categories] Fetch Error';
export const SET_ACTIVE_CATEGORY = '[categories] Set';

// posts
export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const fetchCategoriesSuccess = categories => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const fetchCategoriesFailure = error => {
  return {
    type: FETCH_CATEGORIES_FAILURE,
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
    type: SET_ACTIVE_CATEGORY,
    payload: category,
  };
};
