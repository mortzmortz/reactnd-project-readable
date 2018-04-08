import { CHANGE_SORTING } from 'redux/actions/sorting';

const initialState = {
  byName: {
    new: {
      index: 0,
      name: 'new',
      path: 'new',
    },
    popular: {
      index: 1,
      name: 'popular',
      path: 'popular',
    },
  },
  sortBy: 'new',
};

const sorting = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORTING:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default sorting;