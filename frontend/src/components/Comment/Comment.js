import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRelativeDate } from 'utils/utils';

import { Timeline, Button, Dropdown, Menu, Input } from 'antd';
import './Comment.css';

import {
  deleteComment,
  editComment,
  voteComment,
} from 'redux/actions/comments';

class Comment extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
  };

  menuOptions = [
    {
      name: 'Edit',
      fn: () =>
        this.setState({
          isEditing: true,
        }),
    },
    {
      name: 'Delete',
      fn: comment => this.props.deleteComment(this.props.comment.id),
    },
  ];

  state = {
    isEditing: false,
    editBody: this.props.comment.body,
  };

  componentDidUpdate(prevProps) {
    if (this.props.comment.body !== prevProps.comment.body) {
      this.setState({
        editBody: this.props.comment.body,
      });
    }
  }

  reset = () => {
    this.setState({
      isEditing: false,
      editBody: '',
    });
  };

  handleCommentVoteClick = (commentId, option) => {
    this.props.voteComment(commentId, option);
  };

  handleMenuSelect = (event, i) => {
    event.preventDefault();
    this.menuOptions[i].fn(this.props.comment);
  };

  handleEditInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleEditCancelAction = () => {
    this.reset();
  };

  handleEditSubmitAction = () => {
    // TODO: add validation
    const data = {
      timestamp: Date.now(),
      body: this.state.editBody,
    };
    this.props.editComment(this.props.comment.id, data);
    this.reset();
  };

  commentMenu = (
    <Menu>
      {this.menuOptions.map((option, i) => (
        <Menu.Item key={option.name}>
          <a href="" onClick={event => this.handleMenuSelect(event, i)}>
            {option.name}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  render() {
    const { comment } = this.props;

    if (comment.deleted) {
      return null;
    }

    return (
      <React.Fragment>
        <Timeline.Item style={styles.timelineItem}>
          {this.state.isEditing ? (
            <div>
              <Input
                name="editBody"
                value={this.state.editBody}
                onChange={this.handleEditInputChange}
              />
              <Button.Group size="small" style={styles.editCommentButtons}>
                <Button onClick={this.handleEditCancelAction}>Cancel</Button>
                <Button onClick={this.handleEditSubmitAction}>Submit</Button>
              </Button.Group>
            </div>
          ) : (
            <React.Fragment>
              <div className="comment-head">
                <div className="comment-head--left">{comment.body}</div>
                <div className="comment-head--right">
                  <Dropdown overlay={this.commentMenu} trigger={['click']}>
                    <Button
                      className="ant-dropdown-link"
                      shape="circle"
                      icon="ellipsis"
                    />
                  </Dropdown>
                </div>
              </div>
              <div className="comment-meta">
                <div>
                  <span className="comment-meta--author">{comment.author}</span>
                  <span className="comment-meta--date">
                    {getRelativeDate(comment.timestamp)}
                  </span>
                </div>
                <div>
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    icon="like"
                    onClick={() =>
                      this.handleCommentVoteClick(comment.id, 'upVote')
                    }
                  />
                  <span className="post-meta--score">{comment.voteScore}</span>
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    icon="dislike"
                    onClick={() =>
                      this.handleCommentVoteClick(comment.id, 'downVote')
                    }
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </Timeline.Item>
      </React.Fragment>
    );
  }
}

const styles = {};

styles.card = {
  marginTop: '2rem',
  width: '100%',
};

styles.timelineItem = {
  paddingBottom: '40px',
};

styles.editCommentButtons = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '0.5rem',
};

styles.voteButton = {
  minWidth: '0',
};

styles.thumbIcon = {
  marginRight: 0,
};

export default compose(
  withRouter,
  connect(null, {
    deleteComment,
    editComment,
    voteComment,
  })
)(Comment);
