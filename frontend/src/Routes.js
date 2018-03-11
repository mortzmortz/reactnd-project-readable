import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/theme.css';
import theme from './styles/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import { Header } from 'components';
import { PostListView } from './views/';

const Routes = (
  <Router>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Route component={Header} />
        <main>
          <Switch>
            <Route exact path="/" component={PostListView} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </main>
      </Fragment>
    </ThemeProvider>
  </Router>
);

export default Routes;
