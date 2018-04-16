import React from 'react';
import PropTypes from 'prop-types';
import { PostCard, OrderTab, NewPost } from 'components/';
import './PostsList.css';

class PostsList extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    simpleCard: PropTypes.bool,
  };

  render() {
    const { posts } = this.props;
    // const sortedPosts = this.getSortedPosts(posts, sortBy);

    return (
      <div className="posts-list">
        <OrderTab />
        <NewPost />
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            simpleCard={this.props.simpleCard}
          />
        ))}
      </div>
    );
  }
}

export default PostsList;
