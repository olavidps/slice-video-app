import React, { Component } from 'react';
import '../../css/clip.css';

class Clip extends Component {
  render() {
    return (
      <div className="clip">
        <b>{this.props.data.title}</b>
        <div className="duration">{this.props.data.start} - {this.props.data.end}</div>
        <button
          id={this.props.data.id}
          onClick={this.props.handlePlay}>
            Play
        </button>
        {
          this.props.data.id !== 0
          ?
          <div>
            <button
              onClick={this.props.handleForm.bind(this, this.props.data)}>
                Edit
            </button>
            <button
              id={this.props.data.id}
              onClick={this.props.handleRemove}>
                Remove
            </button>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default Clip;
