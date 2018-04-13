import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getActivePost, resetActivePost } from 'redux/actions/posts';
import { getPostComments } from 'redux/actions/comments';

import { LoadingIndicator, PostCardDetail } from 'components/';

// TODO: add a simple postcard component

class SinglePostView extends React.Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    activePost: PropTypes.object.isRequired,
    commentsList: PropTypes.array.isRequired,
    getActivePost: PropTypes.func.isRequired,
    resetActivePost: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { post_id } = this.props.match.params;
    this.props.getActivePost(post_id);
    this.props.getPostComments(post_id);
  }

  componentDidUpdate() {
    if (this.props.activePost.deleted) this.props.history.push(`/`);
  }

  componentWillUnmount() {
    this.props.resetActivePost();
  }

  render() {
    const { posts, activePost, commentsList } = this.props;

    return (
      <div>
        {posts.isFetching ? (
          <LoadingIndicator />
        ) : (
          <PostCardDetail post={activePost} comments={commentsList} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  activePost: state.posts.byId[state.posts.active] || {},
  commentsList: Object.values(state.comments.byId) || [],
});

export default withRouter(
  connect(mapStateToProps, {
    getActivePost,
    getPostComments,
    resetActivePost,
  })(SinglePostView)
);
