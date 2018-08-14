import React, { Component } from 'react';
import '../../css/app.css';
import Clip from '../Clip'
import Form from '../Form'

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
          end: '00:00:06'
        },
        {
          id: 1,
          title: 'Clip 02',
          start: '00:00:08',
          end: '00:00:10'
        }
      ],
      clip: {
        id: 0,
        title: 'Original video',
        start: '00:00:00',
        end: '00:00:06'
      }
    }

    this.handlePlay = this.handlePlay.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handlePlay(event) {
    const id = parseInt(event.target.id, 10)
    const clip = this.state.clips.find((clipState) => {
      return id === clipState.id
    })
    this.setState({
      clip,
      mode: "playing"
    })
    document.getElementById("video").currentTime = this.timeToSeconds(clip.start)
    document.getElementById("video").play()
  }

  handleRemove(event) {
    const id = parseInt(event.target.id, 10)
    if(id !== 0) {
      const clips = this.state.clips.filter(function (clip) {
        return clip.id !== id;
      })
      this.setState({ clips }) 
    }
  }

  handleForm(event) {
    if(event.target.clip) {
      this.setState({mode: 'editing'})
    } else {
      this.setState({mode: 'adding'})
    }
  }

  handleSave(clip, event) {
    let clips = this.state.clips
    if(clip.id == 0) {
      clip.id = this.state.clips.length
    }
    clips.push(clip)
    console.log(clips)
    this.setState({ clips })
  }

  timeToSeconds(time) {
    let parts = time.split(':')
    return ((parts[0] * 3600) + (parts[1] * 60) + parts[2])
  }

  render() {
    let videoSource = this.state.videoUrl

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
            autoPlay
            key={videoSource}>
            <source
              src={ videoSource } />
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
                  key={i} />
              )
            })
          }
          {
            this.state.mode !== "playing"
            ?
            <Form
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
