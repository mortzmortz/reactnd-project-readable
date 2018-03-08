import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'redux/reducers/rootReducer';

// TODO: sync history with store: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
