import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LoadingIndicator, PostsList } from 'components/';

import { getAllPosts } from 'redux/actions/posts';
import { setActiveCategory } from 'redux/actions/categories';

// TODO: add a simple postcard component

class AllPostsView extends React.Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    postsList: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired,
    sorting: PropTypes.object.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    setActiveCategory: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { setActiveCategory, getAllPosts, categories } = this.props;
    categories.active !== null && setActiveCategory(null);
    getAllPosts();
  };

  render() {
    const { posts, postsList, sorting } = this.props;

    return (
      <div className="posts-list">
        {posts.isFetching ? (
          <LoadingIndicator />
        ) : (
          <PostsList posts={postsList} sortBy={sorting.sortBy} />
        )}
        {/* <pre>{JSON.stringify(postsList, null, 2)}</pre> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  postsList: Object.values(state.posts.byId).filter(post => !post.deleted),
  categories: state.categories,
  sorting: state.sorting,
});

export default connect(mapStateToProps, {
  getAllPosts,
  setActiveCategory,
})(AllPostsView);
