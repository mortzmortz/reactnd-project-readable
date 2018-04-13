import React from 'react';
import { withRouter } from 'react-router-dom';
import { CardPrimaryAction } from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';

class NewComment extends React.Component {
  render() {
    return (
      <CardPrimaryAction>
        <div style={{ padding: '1rem' }}>
          <Typography use="title" theme="text-secondary-on-background">
            New Comment
          </Typography>
        </div>
      </CardPrimaryAction>
    );
  }
}

export default withRouter(NewComment);
