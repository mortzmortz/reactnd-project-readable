import React from 'react';
import { Card } from 'rmwc/Card';
import { Comment, NewComment } from 'components/';

const Comments = ({ comments }) => (
  <Card style={{ marginTop: '1rem' }}>
    <NewComment />
    {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
  </Card>
);

export default Comments;
