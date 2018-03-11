import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import { LoadingIndicator } from '../components/';
import { getData } from '../server';

class App extends Component {
  componentDidMount = () => {
    getData('/posts')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="post-list">
        <Button label="Test Button" raised primary />
        <p>I am a list</p>
        <LoadingIndicator />
      </div>
    );
  }
}

export default App;
