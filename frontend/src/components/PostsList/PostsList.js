import React from 'react';
import PropTypes from 'prop-types';
import { PostCard, OrderTab, NewPost } from 'components/';
import './PostsList.css';

import { sortByKey } from 'utils/utils';

class PostsList extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    sortBy: PropTypes.string.isRequired,
    simpleCard: PropTypes.bool,
  };

  getSortedPosts(posts, sortBy) {
    const sortParam = sortBy === 'new' ? 'timestamp' : 'voteScore';
    return sortByKey(posts, sortParam);
  }

  render() {
    const { posts, sortBy } = this.props;
    const sortedPosts = this.getSortedPosts(posts, sortBy);

    return (
      <div className="posts-list">
        <OrderTab />
        <NewPost />
        {sortedPosts.map(post => (
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
