import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getRelativeDate } from 'utils/utils';

import { deletePost, votePost, editPost } from 'redux/actions/posts';

import { Card, Icon, Button, Tag, Divider, Input, Form } from 'antd';
import './PostCard.css';

class PostCard extends React.Component {
  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    simpleCard: PropTypes.bool,
    votePost: PropTypes.func.isRequired,
  };

  static defaultProps = {
    showCommentCount: false,
  };

  state = {
    isEditing: false,
    editTitle: this.props.post.title,
    editBody: this.props.post.body,
  };

  reset = () => {
    this.setState({
      isEditing: false,
    });
  };

  handleCancelEditAction = () => {
    this.reset();
  };

  handleSubmitEditAction = () => {
    const data = {
      title: this.state.editTitle,
      body: this.state.editBody,
    };
    this.props.editPost(this.props.post.id, data);
    this.reset();
  };

  handlePostVoteClick = (postId, option) => {
    this.props.votePost(postId, option);
  };

  handleDeleteAction = () => {
    this.props.deletePost(this.props.post.id);
  };

  handleEditAction = () => {
    this.setState({
      isEditing: true,
    });
  };

  handleEditInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { post } = this.props;
    if (this.state.isEditing) {
      return (
        <Card
          style={styles.card}
          actions={[
            <p onClick={this.handleCancelEditAction}>Cancel</p>,
            <p onClick={this.handleSubmitEditAction}>Submit</p>,
          ]}
        >
          <Form.Item label="Title">
            <Input
              name="editTitle"
              value={this.state.editTitle}
              onChange={this.handleEditInputChange}
            />
          </Form.Item>
          <Form.Item label="Content">
            <Input
              name="editBody"
              value={this.state.editBody}
              onChange={this.handleEditInputChange}
            />
          </Form.Item>
        </Card>
      );
    }
    return (
      <Card
        style={styles.card}
        actions={[
          <p onClick={this.handleEditAction}>Edit</p>,
          <p onClick={this.handleDeleteAction}>Delete</p>,
        ]}
        title={<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>}
        extra={
          <Tag style={styles.tag} color="#2E94F9">
            <Link to={`/${post.category}`}>{post.category}</Link>
          </Tag>
        }
      >
        <Card.Meta
          description={
            <div>
              <span className="post-meta--author">{post.author}</span>
              <span className="post-meta--date">
                {getRelativeDate(post.timestamp)}
              </span>
            </div>
          }
        />
        {!this.props.simpleCard && <p className="post-body">{post.body}</p>}
        <Divider />
        <div style={styles.voteSection}>
          <div>
            <Button
              type="primary"
              shape="circle"
              icon="like"
              onClick={() => this.handlePostVoteClick(post.id, 'upVote')}
            />
            <span className="post-meta--score">{post.voteScore}</span>
            <Button
              type="primary"
              shape="circle"
              icon="dislike"
              onClick={() => this.handlePostVoteClick(post.id, 'downVote')}
            />
          </div>
          <div style={styles.commentCount}>
            <Icon type="message" style={styles.commentIcon} />
            {post.commentCount}
          </div>
        </div>
      </Card>
    );
  }
}

const styles = {};

styles.card = {
  marginTop: '2rem',
};

styles.tag = {
  textTransform: 'uppercase',
};

styles.voteSection = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

styles.commentCount = {
  display: 'flex',
  alignItems: 'center',
};

styles.commentIcon = {
  fontSize: '18px',
  marginRight: '0.5rem',
  color: '#2E94F9',
};

export default compose(
  withRouter,
  connect(null, {
    deletePost,
    editPost,
    votePost,
  })
)(PostCard);
