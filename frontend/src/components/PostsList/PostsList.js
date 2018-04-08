import React from 'react';
import PropTypes from 'prop-types';
import { PostCard, OrderTab, NewPost } from 'components/';
import './PostsList.css';

class PostsList extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    sortBy: PropTypes.string.isRequired,
  };

  getSortedPosts(posts, sortBy) {
    const sortParam = sortBy === 'new' ? 'timestamp' : 'voteScore';
    return posts.sort((a, b) => a[sortParam] < b[sortParam]);
  }

  render() {
    const { posts, sortBy } = this.props;
    const sortedPosts = this.getSortedPosts(posts, sortBy);

    return (
      <div className="posts-list">
        <OrderTab />
        <NewPost />
        {sortedPosts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    );
  }
}

export default PostsList;
