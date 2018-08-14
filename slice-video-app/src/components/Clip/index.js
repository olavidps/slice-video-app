import React, { Component } from 'react';
import '../../css/clip.css';

class App extends Component {
  render() {
    return (
      <div className="clip">
        {this.props.data.title}
        <button
          id={this.props.data.id}
          onClick={this.props.handlePlay}>
            Play
        </button>
        <button
          id={this.props.data.id}
          onClick={this.props.handleRemove}>
            Remove
        </button>
      </div>
    );
  }
}

export default App;
