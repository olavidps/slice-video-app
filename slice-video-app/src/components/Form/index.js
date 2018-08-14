import React, { Component } from 'react';
import '../../css/form.css';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clip: {
        id: 0,
        title: 'Original video',
        start: '00:00:00',
        end: '00:00:06'
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let clip = this.state.clip
    clip[event.target.name] = event.target.value

    this.setState({'clip': clip})
  }

  componentWillMount() {
    document.getElementById("video").pause()
    //this.setState({clip: this.props.data})
  }

  timeToSeconds(time) {
    let parts = time.split(':')
    return ((parts[0] * 3600) + (parts[1] * 60) + parts[2])
  }

  render() {
    return (
      <div className="form">
        <div className="form-item">
          <label>Title: </label>
          <input value={this.state.clip.title} name="title" onChange={this.handleChange}/>
        </div>
        <div className="form-item">
          <label>Start: </label>
          <input value={this.state.clip.start} name="start" onChange={this.handleChange}/>
        </div>
        <div className="form-item">
          <label>End: </label>
          <input value={this.state.clip.end} name="end" onChange={this.handleChange}/>
        </div>
        <button onClick={this.props.handleSave.bind(this, this.state.clip)}>
          Save
        </button>
      </div>
    );
  }
}

export default Form;
