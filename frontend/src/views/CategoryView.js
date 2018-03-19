import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentCategory } from 'redux/actions/categories';

class CategoryView extends Component {
  componentDidMount = () => {
    const { current } = this.props.categories;
    const { category_name } = this.props.match.params;

    if (current !== category_name) {
      this.props.setCurrentCategory(category_name);
    }
  };

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const hasNavigated = nextProps.location.pathname !== location.pathname;

    if (hasNavigated && nextProps.location.state) {
      this.props.setCurrentCategory(nextProps.location.state.category);
    }
  }

  render() {
    return <p>Category View</p>;
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default withRouter(
  connect(mapStateToProps, {
    setCurrentCategory,
  })(CategoryView)
);
