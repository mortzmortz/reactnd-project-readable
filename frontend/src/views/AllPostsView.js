import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LoadingIndicator, PostsList, OrderTab } from 'components/';

import { getAllPosts } from 'redux/actions/posts';
import { setCurrentCategory } from 'redux/actions/categories';

class AllPostsView extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    this.props.getAllPosts();
    this.props.setCurrentCategory(null);
  };

  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        <OrderTab />
        {posts.isFetching ? <LoadingIndicator /> : <PostsList posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  getAllPosts,
  setCurrentCategory,
})(AllPostsView);
