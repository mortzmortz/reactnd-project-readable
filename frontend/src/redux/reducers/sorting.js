import * as types from '../types';

const initialState = {
  byName: {
    new: {
      name: 'new',
      path: 'new',
    },
    popular: {
      name: 'popular',
      path: 'popular',
    },
  },
  sortBy: 'new',
};

const sorting = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SORTING:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default sorting;
