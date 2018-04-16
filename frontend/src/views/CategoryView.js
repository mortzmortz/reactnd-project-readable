import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sortByKey } from 'utils/utils';

import { setActiveCategory } from 'redux/actions/categories';
import { getAllPostsByCategory } from 'redux/actions/posts';

import { LoadingIndicator, PostsList } from 'components/';

class CategoryView extends React.Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    getAllPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    sortedPosts: PropTypes.array.isRequired,
    setActiveCategory: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { current } = this.props.categories;
    const { category } = this.props.match.params;

    if (current !== category) {
      this.props.setActiveCategory(category);
      this.props.getAllPostsByCategory(category);
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
    const { posts, sortedPosts } = this.props;

    return (
      <div className="posts-list">
        {posts.isFetching ? (
          <LoadingIndicator />
        ) : (
          <PostsList posts={sortedPosts} allPosts={posts} simpleCard={true} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const validPostsList = Object.values(state.posts.byId).filter(
    post => !post.deleted
  );
  const sortParam = state.sorting.sortBy === 'new' ? 'timestamp' : 'voteScore';
  return {
    categories: state.categories,
    posts: state.posts,
    sortedPosts: sortByKey(validPostsList, sortParam),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    setActiveCategory,
    getAllPostsByCategory,
  })
)(CategoryView);
