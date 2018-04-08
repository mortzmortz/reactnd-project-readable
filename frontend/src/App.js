import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllCategories } from 'redux/actions/categories';

class App extends React.Component {
  componentDidMount = () => {
    this.props.getAllCategories();
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(
  connect(null, {
    getAllCategories,
  })(App)
);
