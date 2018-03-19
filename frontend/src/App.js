import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllCategories } from 'redux/actions/categories';

class App extends Component {
  componentDidMount = () => {
    this.props.getAllCategories();
  };

  setCategory = () => {
    console.log(this.props);
    this.props.setCurrentCategory();
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
