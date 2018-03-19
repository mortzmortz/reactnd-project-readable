import * as types from 'redux/types';

const initialState = {
  allTabs: [
    {
      name: 'new',
      path: 'new',
    },
    {
      name: 'popular',
      path: 'popular',
    },
  ],
  currentTab: {
    name: 'new',
    path: 'new',
  },
};

const sorting = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_TAB:
      return {
        ...state,
        currentTab: action.payload,
      };
    default:
      return state;
  }
};

export default sorting;
