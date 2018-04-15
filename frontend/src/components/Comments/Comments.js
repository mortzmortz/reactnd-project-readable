import React from 'react';
import PropTypes from 'prop-types';
import { Card, Timeline } from 'antd';
import { Comment, NewComment } from 'components/';

const Comments = ({ comments }) => (
  <Card style={{ marginTop: '-1px' }}>
    <NewComment />
    <Timeline style={{ marginTop: '2rem' }}>
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </Timeline>
  </Card>
);

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
