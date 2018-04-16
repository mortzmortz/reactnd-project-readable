import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { sortByKey } from 'utils/utils';

import { LoadingIndicator, PostsList } from 'components/';

import { getAllPosts } from 'redux/actions/posts';
import { setActiveCategory } from 'redux/actions/categories';

class AllPostsView extends React.Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    sortedPosts: PropTypes.array.isRequired,
    setActiveCategory: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { setActiveCategory, getAllPosts, categories } = this.props;
    categories.active !== null && setActiveCategory(null);
    getAllPosts();
  };

  render() {
    const { posts, sortedPosts } = this.props;

    return (
      <div className="posts-list">
        {posts.isFetching ? (
          <LoadingIndicator />
        ) : (
          <PostsList posts={sortedPosts} simpleCard={true} />
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
  connect(mapStateToProps, {
    getAllPosts,
    setActiveCategory,
  })
)(AllPostsView);
