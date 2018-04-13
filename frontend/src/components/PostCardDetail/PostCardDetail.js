import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { votePost } from 'redux/actions/posts';
import { PostCard } from 'components/';

import { Comments } from 'components/';

class PostCardDetail extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
  };

  render() {
    const { post, comments } = this.props;
    return (
      <React.Fragment>
        <PostCard key={post.id} post={post} showCommentCount={false} />
        {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}
        <Comments comments={comments} />
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(null, {
    votePost,
  })(PostCardDetail)
);
