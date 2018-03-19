import * as types from 'redux/types';

export const changeTab = tab => ({
  type: types.CHANGE_TAB,
  payload: tab,
});
