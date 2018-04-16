import * as types from '../types';

export const changeSorting = sortBy => ({
  type: types.CHANGE_SORTING,
  payload: sortBy,
});
