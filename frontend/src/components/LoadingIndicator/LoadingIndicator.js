import React from 'react';
import './styles.css';

class LoadingIndicator extends React.Component {
  state = {
    show: false,
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.show ? (
          <div className="loading-indicator">
            <div className="loading-indicator__spinner" />
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default LoadingIndicator;
