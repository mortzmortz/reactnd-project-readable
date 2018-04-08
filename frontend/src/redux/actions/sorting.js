export const CHANGE_SORTING = '[sorting] Change';

export const changeSorting = sortBy => ({
  type: CHANGE_SORTING,
  payload: sortBy,
});
