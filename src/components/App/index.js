import React, { Component } from 'react';
import '../../css/app.css';
import Clip from '../Clip'
import Form from '../Form'
const uuidv1 = require('uuid/v1')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoUrl: '../../sintel_trailer-480p.mp4',
      mode: 'playing', // adding, playing, editing
      time: {
        start: '',
        end: ''
      },
      clips: [
        {
          id: 0,
          title: 'Original video',
          start: '00:00:00',
          end: '00:00:52'
        },
        {
          id: 1,
          title: 'Clip 02 seconds',
          start: '00:00:08',
          end: '00:00:10'
        }
      ],
      clip: null
    }

    this.handlePlay = this.handlePlay.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handlePlay(event) {
    const id = event.target.id
    const clip = this.state.clips.find((clipState) => {
      return id == clipState.id
    })
    this.setState({
      clip,
      mode: "playing"
    })

    document.getElementById("video").currentTime = this.timeToSeconds(clip.start)
    document.getElementById("video").play()
    const leftTime = this.timeToSeconds(clip.end) - this.timeToSeconds(clip.start)
    setTimeout(function() {
      document.getElementById("video").pause()
    }, ((leftTime * 1000) + 1000))
  }

  handleRemove(event) {
    const id = event.target.id
    if(id !== 0) {
      const clips = this.state.clips.filter(function (clip) {
        return clip.id != id;
      })
      this.setState({ clips }) 
    }
  }

  handleForm(data, event) {
    if(data.id) {
      this.setState({
        mode: 'editing',
        clip: data
      })
    } else {
      this.setState({
        mode: 'adding',
        clip: null
      })
    }
  }

  handleSave(clip, event) {
    let clips = this.state.clips
    if(clip.id == 0) {
      clip.id = uuidv1();
      clips.push(clip)
    } else {
      clips.map(c => {
        if(c.id == clip.id) {
          c = clip
        }
      })
    }
    
    this.setState({
      clip,
      clips,
      mode: 'playing'
    })
  }

  timeToSeconds(time) {
    let parts = time.split(':')
    return ((parts[0] * 3600) + (parts[1] * 60) + parts[2])
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h3 className="title">Slice Video App</h3>
        </header>
        <div className="player">
          <video
            id="video"
            width="500px"
            controls
            autoPlay>
            <source
              src={ this.state.videoUrl } />
          </video>
        </div>
        <div className="clips-list">
          {
            this.state.clips.map((clip, i) => {
              return(
                <Clip
                  data={clip}
                  handlePlay={this.handlePlay}
                  handleRemove={this.handleRemove}
                  handleForm={this.handleForm}
                  key={i} />
              )
            })
          }
          {
            this.state.mode !== "playing"
            ?
            <Form
              clip={this.state.clip}
              mode={this.state.mode}
              handleSave={this.handleSave} />
            :
            null
          }
        </div>
        <div className="controls">
          {
            this.state.mode == "playing"
            ?
            <button
              className="add-video-button"
              onClick={this.handleForm}>
              Add Clip
            </button>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default App;
