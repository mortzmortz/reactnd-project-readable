import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Card,
  CardPrimaryAction,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons,
} from 'rmwc/Card';
import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import { Typography } from 'rmwc/Typography';
import { Button, ButtonIcon } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { getRelativeDate } from 'utils/utils';

import { deletePost, votePost } from 'redux/actions/posts';

class PostCard extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    showCommentCount: PropTypes.bool,
  };

  static defaultProps = {
    showCommentCount: true,
  };

  menuOptions = [
    {
      name: 'Edit',
      fn: () => console.log('edit'),
    },
    {
      name: 'Delete',
      fn: id => this.props.deletePost(id),
    },
  ];

  handleCardClick = event => {
    event.stopPropagation();
    this.props.history.push(`/post/${this.props.post.id}`);
  };

  handlePostVoteClick = (postId, option) => {
    this.props.votePost(postId, option);
  };

  handleMenuSelect = event => {
    const { index } = event.detail;
    this.menuOptions[index].fn(this.props.post.id);
  };

  render() {
    const { post } = this.props;
    return (
      <Card style={styles.card}>
        <CardPrimaryAction onClick={this.handleCardClick}>
          <div style={{ padding: '1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography use="subheading1" tag="div">
                  {post.author}
                </Typography>
                <Typography
                  use="body1"
                  tag="div"
                  theme="text-secondary-on-background"
                >
                  {getRelativeDate(post.timestamp)}
                </Typography>
              </div>
            </div>
            <Typography use="title" tag="h2" style={{ marginBottom: 0 }}>
              {post.title}
            </Typography>
            <Typography use="body1" tag="p" style={{ marginBottom: 0 }}>
              {post.body}
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <Button
              dense
              style={styles.voteButton}
              onClick={() => this.handlePostVoteClick(post.id, 'upVote')}
            >
              <ButtonIcon use="thumb_up" style={styles.thumbIcon} />
            </Button>
            <Typography use="button" style={{ padding: '0 1rem' }}>
              {post.voteScore}
            </Typography>
            <Button
              dense
              style={styles.voteButton}
              onClick={() => this.handlePostVoteClick(post.id, 'downVote')}
            >
              <ButtonIcon use="thumb_down" style={styles.thumbIcon} />
            </Button>
          </CardActionButtons>
          <Typography
            use="button"
            theme="text-secondary-on-background"
            style={{ marginLeft: '4rem' }}
          >
            {post.category}
          </Typography>
          <CardActionIcons>
            {this.props.showCommentCount && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Icon strategy="ligature">chat_bubble</Icon>
                <Typography
                  use="body1"
                  tag="span"
                  theme="text-secondary-on-background"
                  style={{ marginLeft: '0.5rem' }}
                >
                  {post.commentCount}
                </Typography>
              </div>
            )}
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
      </Card>
    );
  }
}

const styles = {};

styles.card = {
  marginTop: '2rem',
};

styles.voteButton = {
  minWidth: '0',
};

styles.thumbIcon = {
  marginRight: 0,
};

export default withRouter(
  connect(null, {
    deletePost,
    votePost,
  })(PostCard)
);
