import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getActivePost, resetActivePost } from 'redux/actions/posts';
import { getPostComments } from 'redux/actions/comments';

import { LoadingIndicator } from 'components/';

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
          <div>
            <pre>{JSON.stringify(activePost, null, 2)}</pre>
            {<pre>{JSON.stringify(commentsList, null, 2)}</pre>}
          </div>
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
