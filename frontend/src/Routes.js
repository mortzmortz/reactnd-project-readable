import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from 'components/';
import App from 'App';
import * as Views from './views/';

const Routes = (
  <Router>
    <App>
      <React.Fragment>
        <Route component={Header} />
        <main>
          <Switch>
            <Route exact path="/" component={Views.AllPostsView} />
            <Route path="/new" component={Views.CreateNewPostView} />
            <Route
              path="/:category/:post_id"
              component={Views.SinglePostView}
            />
            <Route path="/:category" component={Views.CategoryView} />
            <Route
              render={() => <p className="route-error">Page not found</p>}
            />
          </Switch>
        </main>
      </React.Fragment>
    </App>
  </Router>
);

export default Routes;
