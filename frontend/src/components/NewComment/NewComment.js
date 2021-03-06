import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Card, Form, Input } from 'antd';

import { addComment } from 'redux/actions/comments';

const cuid = require('cuid');

class NewComment extends React.Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
  };

  state = {
    author: '',
    content: '',
    isEditing: false,
    hasError: true,
  };

  reset = () => {
    this.setState({
      author: '',
      content: '',
      isEditing: false,
      hasError: true,
    });
  };

  validate = () => {
    this.setState({
      hasError: this.state.author === '' || this.state.content === '',
    });
  };

  handleNewClick = () => {
    this.setState({
      isEditing: true,
    });
  };

  handleSubmitEditAction = event => {
    const data = {
      id: cuid(),
      timestamp: Date.now(),
      body: this.state.content,
      author: this.state.author,
      parentId: this.props.match.params.post_id,
    };
    this.props.addComment(data);
    this.reset();
  };

  handleCancelEditAction = event => {
    this.reset();
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value,
      },
      this.validate
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isEditing ? (
          <Card
            actions={[
              <p onClick={this.handleCancelEditAction}>Cancel</p>,
              <p
                onClick={this.handleSubmitEditAction}
                className={this.state.hasError ? 'is-disabled' : ''}
              >
                Submit
              </p>,
            ]}
          >
            <Form.Item label="Author">
              <Input
                name="author"
                value={this.state.author}
                onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Content">
              <Input
                name="content"
                value={this.state.content}
                onChange={this.handleInputChange}
              />
            </Form.Item>
          </Card>
        ) : (
          <Card hoverable="true" onClick={this.handleNewClick}>
            New Comment
          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  connect(null, {
    addComment,
  })
)(NewComment);
