import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CardPrimaryAction,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons,
} from 'rmwc/Card';
import { ListDivider } from 'rmwc/List';
import { Typography } from 'rmwc/Typography';
import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import { Button, ButtonIcon } from 'rmwc/Button';
import { getRelativeDate } from 'utils/utils';

import { deleteComment, voteComment } from 'redux/actions/comments';

class Comment extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
  };

  menuOptions = [
    {
      name: 'Edit',
      fn: () => console.log('edit'),
    },
    {
      name: 'Delete',
      fn: id => this.props.deleteComment(id),
    },
  ];

  handleCommentVoteClick = (commentId, option) => {
    this.props.voteComment(commentId, option);
  };

  handleMenuSelect = event => {
    const { index } = event.detail;
    this.menuOptions[index].fn(this.props.comment.id);
  };

  render() {
    const { comment } = this.props;

    if (comment.deleted) {
      return null;
    }

    return (
      <React.Fragment>
        {/* <pre>{JSON.stringify(this.props.comment, null, 2)}</pre> */}
        <ListDivider />
        <CardPrimaryAction>
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex' }}>
              <Typography use="subheading1" tag="div">
                {comment.author}
              </Typography>
              <Typography
                use="subheading1"
                tag="div"
                theme="text-secondary-on-background"
                style={{ marginLeft: '0.5rem' }}
              >
                {getRelativeDate(comment.timestamp)}
              </Typography>
            </div>
            <Typography use="body1" tag="p" style={{ marginBottom: 0 }}>
              {comment.body}
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <Button
              dense
              style={styles.voteButton}
              onClick={() => this.handleCommentVoteClick(comment.id, 'upVote')}
            >
              <ButtonIcon use="thumb_up" style={styles.thumbIcon} />
            </Button>
            <Typography use="button" style={{ padding: '0 1rem' }}>
              {comment.voteScore}
            </Typography>
            <Button
              dense
              style={styles.voteButton}
              onClick={() =>
                this.handleCommentVoteClick(comment.id, 'downVote')
              }
            >
              <ButtonIcon use="thumb_down" style={styles.thumbIcon} />
            </Button>
          </CardActionButtons>
          <CardActionIcons>
            <SimpleMenu
              handle={<CardAction icon use="more_vert" />}
              onSelected={this.handleMenuSelect}
            >
              {this.menuOptions.map(option => (
                <MenuItem key={option.name}>{option.name}</MenuItem>
              ))}
            </SimpleMenu>
          </CardActionIcons>
        </CardActions>
      </React.Fragment>
    );
  }
}

const styles = {};

styles.card = {
  marginTop: '2rem',
  width: '100%',
};

styles.voteButton = {
  minWidth: '0',
};

styles.thumbIcon = {
  marginRight: 0,
};

export default connect(null, {
  deleteComment,
  voteComment,
})(Comment);
