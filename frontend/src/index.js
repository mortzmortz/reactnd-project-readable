import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import Routes from './Routes';

const rootEl = document.getElementById('root');

ReactDOM.render(<Provider store={store}>{Routes}</Provider>, rootEl);

registerServiceWorker();
