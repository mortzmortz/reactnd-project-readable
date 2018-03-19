import React, { Component } from 'react';
import { PostCard } from 'components/';
import './PostsList.css';

class PostsList extends Component {
  render() {
    const { posts } = this.props;

    return (
      <React.Fragment>
        <div className="posts-list">
          {posts.allPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
        <pre>{JSON.stringify(posts.allPosts, undefined, 4)}</pre>
      </React.Fragment>
    );
  }
}

export default PostsList;
