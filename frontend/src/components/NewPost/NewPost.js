import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card } from 'antd';

const NewPost = ({ match }) => (
  <Link
    to={{
      pathname: '/new',
      state: { fromCategory: match.params.category },
    }}
  >
    <Card hoverable="true" style={styles.card}>
      <p>New Post</p>
    </Card>
  </Link>
);

const styles = {};

styles.card = {
  marginTop: '2rem',
};

export default withRouter(NewPost);
