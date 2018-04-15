import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Card, Form, Input, Radio } from 'antd';

import { addPost } from 'redux/actions/posts';

const cuid = require('cuid');

class CreatNewPost extends React.Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
  };

  state = {
    title: '',
    author: '',
    content: '',
    category: 'react',
  };

  reset = () => {
    this.setState({
      title: '',
      author: '',
      content: '',
      category: 'react',
    });
  };

  handleSubmitEditAction = event => {
    // TODO: add validation
    const data = {
      id: cuid(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
      category: this.state.category,
    };
    this.props.addPost(data);
    this.props.history.goBack();
  };

  handleCancelEditAction = event => {
    this.props.history.goBack();
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Card
        style={styles.card}
        actions={[
          <p onClick={this.handleCancelEditAction}>Cancel</p>,
          <p onClick={this.handleSubmitEditAction}>Submit</p>,
        ]}
      >
        <Form.Item label="Author">
          <Input
            name="author"
            value={this.state.author}
            onChange={this.handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Title">
          <Input
            name="title"
            value={this.state.title}
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
        <Form.Item label="Category">
          <Radio.Group
            name="category"
            onChange={this.handleInputChange}
            value={this.state.category}
          >
            {Object.values(this.props.categories.byName).map(category => (
              <Radio.Button key={category.name} value={category.name}>
                {category.name.toUpperCase()}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      </Card>
    );
  }
}

const styles = {};

styles.card = {
  marginTop: '2rem',
};

styles.cardAction = {
  justifyContent: 'flex-end',
};

const mapStateToProps = state => ({
  categories: state.categories,
});
export default withRouter(
  connect(mapStateToProps, {
    addPost,
  })(CreatNewPost)
);
