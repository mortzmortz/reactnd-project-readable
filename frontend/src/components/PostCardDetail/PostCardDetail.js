import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { votePost } from 'redux/actions/posts';

import { Comments, PostCard } from 'components/';

class PostCardDetail extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    votePost: PropTypes.func.isRequired,
  };

  render() {
    const { post, comments } = this.props;
    return (
      <React.Fragment>
        <PostCard key={post.id} post={post} />
        <Comments comments={comments} />
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  connect(null, {
    votePost,
  })
)(PostCardDetail);
