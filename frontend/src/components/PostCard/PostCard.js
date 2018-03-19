import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
import { distanceInWords } from 'date-fns';

class PostCard extends Component {
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

  render() {
    const { post } = this.props;
    return (
      <Card style={styles.card}>
        <CardPrimaryAction onClick={this.handleCardClick}>
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography use="title" tag="h2">
                {post.title}
              </Typography>
              <Chip>
                <ChipText style={{ textTransform: 'uppercase' }}>
                  {post.category}
                </ChipText>
              </Chip>
            </div>
            <Typography
              use="subheading1"
              tag="h3"
              theme="text-secondary-on-background"
              style={{ marginTop: '-1rem' }}
            >
              by {post.author}
            </Typography>
            <Typography use="body1" theme="text-secondary-on-background">
              {this.getRelativeDate(post.timestamp)}
            </Typography>
            <Typography
              use="body1"
              tag="div"
              theme="text-secondary-on-background"
            >
              {post.body}
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <Button dense style={styles.voteButton}>
              <ButtonIcon use="thumb_up" style={styles.thumbIcon} />
            </Button>
            <Typography use="button" style={{ padding: '0 1rem' }}>
              {post.voteScore}
            </Typography>
            <Button dense style={styles.voteButton}>
              <ButtonIcon use="thumb_down" style={styles.thumbIcon} />
            </Button>
          </CardActionButtons>
          <CardActionIcons>
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

export default withRouter(PostCard);
