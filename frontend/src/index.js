import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import Routes from './Routes';

import 'material-components-web/dist/material-components-web.min.css';
import './styles/index.css';

const rootEl = document.getElementById('root');

ReactDOM.render(<Provider store={store}>{Routes}</Provider>, rootEl);

registerServiceWorker();
