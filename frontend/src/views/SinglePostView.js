import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sortByKey } from 'utils/utils';

import { getActivePost, resetActivePost } from 'redux/actions/posts';
import { getPostComments, resetComments } from 'redux/actions/comments';

import { LoadingIndicator, PostCardDetail } from 'components/';

class SinglePostView extends React.Component {
  static propTypes = {
    activePost: PropTypes.object.isRequired,
    commentsList: PropTypes.array.isRequired,
    getActivePost: PropTypes.func.isRequired,
    getPostComments: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    resetActivePost: PropTypes.func.isRequired,
    resetComments: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { post_id } = this.props.match.params;
    if (post_id) {
      this.props.getActivePost(post_id);
      this.props.getPostComments(post_id);
    }
  }

  componentDidUpdate() {
    if (this.props.activePost.deleted) this.props.history.push(`/`);
  }

  componentWillUnmount() {
    this.props.resetActivePost();
    this.props.resetComments();
  }

  render() {
    const { posts, activePost, commentsList } = this.props;

    return (
      <div>
        {posts.isFetching ? (
          <LoadingIndicator />
        ) : activePost.id ? (
          <PostCardDetail post={activePost} comments={commentsList} />
        ) : (
          <p className="route-error">Post not found</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activePost: state.posts.byId[state.posts.active] || {},
  commentsList:
    sortByKey(Object.values(state.comments.byId), 'timestamp') || [],
  posts: state.posts,
});

export default withRouter(
  connect(mapStateToProps, {
    getActivePost,
    resetActivePost,
    getPostComments,
    resetComments,
  })(SinglePostView)
);
