import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from 'App';

const Routes = (
  <Router>
    <main>
      <Switch>
        <Route exact path="/" component={App} />
        <Route render={() => <p>Not Found</p>} />
      </Switch>
    </main>
  </Router>
);

export default Routes;
