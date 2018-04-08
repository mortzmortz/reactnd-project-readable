import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { votePost } from 'redux/actions/posts';
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
import { Chip, ChipText } from 'rmwc/Chip';
import { Icon } from 'rmwc/Icon';
import { distanceInWords } from 'date-fns';

class PostCardDetail extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  getRelativeDate = timestamp => {
    return distanceInWords(timestamp, new Date());
  };

  handleCardClick = event => {
    event.stopPropagation();
    this.props.history.push(`/post/${this.props.post.id}`);
  };

  handlePostVoteClick = (postId, option) => {
    this.props.votePost(postId, option);
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
                  {this.getRelativeDate(post.timestamp)}
                </Typography>
              </div>
              <Chip style={{ pointerEvents: 'none' }}>
                <ChipText style={{ textTransform: 'uppercase' }}>
                  {post.category}
                </ChipText>
              </Chip>
            </div>
            <Typography use="title" tag="h2" style={{ marginBottom: 0 }}>
              {post.title}
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
          <CardActionIcons>
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
            <SimpleMenu handle={<CardAction icon use="more_vert" />}>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
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
  width: '100%',
};

styles.voteButton = {
  minWidth: '0',
};

styles.thumbIcon = {
  marginRight: 0,
};

export default withRouter(
  connect(null, {
    votePost,
  })(PostCardDetail)
);
