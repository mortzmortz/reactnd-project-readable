import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'antd';

const NewPost = ({ history }) => (
  <Card
    hoverable="true"
    style={styles.card}
    onClick={() => history.push(`/post/new`)}
  >
    <p>New Post</p>
  </Card>
);

const styles = {};

styles.card = {
  marginTop: '2rem',
};

export default withRouter(NewPost);
