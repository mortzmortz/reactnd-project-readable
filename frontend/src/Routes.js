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
            <Route path="/post/new" component={Views.NewPostView} />
            <Route path="/post/:post_id" component={Views.SinglePostView} />
            <Route
              path="/category/:category_name"
              component={Views.CategoryView}
            />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </main>
      </React.Fragment>
    </App>
  </Router>
);

export default Routes;
