import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sortByKey } from 'utils/utils';

import { getActivePost } from 'redux/actions/posts';
import { getPostComments } from 'redux/actions/comments';

import { CreatNewPost } from 'components/';

class CreateNewPostView extends React.Component {
  static propTypes = {
    activePost: PropTypes.object.isRequired,
    commentsList: PropTypes.array.isRequired,
    getActivePost: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { post_id } = this.props.match.params;
    if (post_id) {
      this.props.getActivePost(post_id);
      this.props.getPostComments(post_id);
    }
  }

  render() {
    const { activePost, commentsList } = this.props;

    return <CreatNewPost post={activePost} comments={commentsList} />;
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
    getPostComments,
  })(CreateNewPostView)
);
