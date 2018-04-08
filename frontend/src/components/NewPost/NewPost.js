import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardPrimaryAction } from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';

class NewPost extends React.Component {
  handleCardClick = () => {
    this.props.history.push(`/post/new`);
  };

  render() {
    return (
      <Card style={styles.card}>
        <CardPrimaryAction onClick={this.handleCardClick}>
          <div style={{ padding: '1rem' }}>
            <Typography use="title" style={styles.title}>
              New Post
            </Typography>
          </div>
        </CardPrimaryAction>
      </Card>
    );
  }
}

const styles = {};

styles.card = {
  marginTop: '2rem',
  width: '100%',
};

styles.title = {
  color: 'rgba(0, 0, 0, 0.54)',
};

export default withRouter(NewPost);
