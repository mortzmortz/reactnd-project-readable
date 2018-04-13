import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setActiveCategory } from 'redux/actions/categories';
import { getAllPostsByCategory } from 'redux/actions/posts';

import { LoadingIndicator, PostsList } from 'components/';

class CategoryView extends React.Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    postsList: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired,
    sorting: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { current } = this.props.categories;
    const { category_name } = this.props.match.params;

    if (current !== category_name) {
      this.props.setActiveCategory(category_name);
      this.props.getAllPostsByCategory(category_name);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const hasNavigated = nextProps.location.pathname !== location.pathname;

    if (hasNavigated && nextProps.location.state) {
      const { category } = nextProps.location.state;
      this.props.setActiveCategory(category);
      this.props.getAllPostsByCategory(category);
    }
  }

  render() {
    const { posts, postsList, sorting } = this.props;

    return (
      <div className="posts-list">
        {posts.isFetching ? (
          <LoadingIndicator />
        ) : (
          <PostsList posts={postsList} sortBy={sorting.sortBy} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  postsList: Object.values(state.posts.byId),
  categories: state.categories,
  sorting: state.sorting,
});

export default withRouter(
  connect(mapStateToProps, {
    setActiveCategory,
    getAllPostsByCategory,
  })(CategoryView)
);
