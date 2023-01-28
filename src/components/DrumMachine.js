import React from 'react'
import Display from './Display'

const heaterKit = {
  name: 'Heater Kit',
  audioClips: [
    {
      label: 'Q',
      id: 'Heater-1',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      label: 'W',
      id: 'Heater-2',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      label: 'E',
      id: 'Heater-3',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      label: 'A',
      id: 'Heater-4',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      label: 'S',
      id: 'Clap',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      label: 'D',
      id: 'Open-HH',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      label: 'Z',
      id: "Kick-n'-Hat",
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      label: 'X',
      id: 'Kick',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      label: 'C',
      id: 'Closed-HH',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ]
}
const smoothPianoKit = {
  name: 'Smooth Piano Kit',
  audioClips: [
    {
      label: 'Q',
      id: 'Chord-1',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      label: 'W',
      id: 'Chord-2',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      label: 'E',
      id: 'Chord-3',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      label: 'A',
      id: 'Shaker',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      label: 'S',
      id: 'Open-HH',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      label: 'D',
      id: 'Closed-HH',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      label: 'Z',
      id: 'Punchy-Kick',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      label: 'X',
      id: 'Side-Stick',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      label: 'C',
      id: 'Snare',
      audio: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ]
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: heaterKit.name,
      audioClips: heaterKit.audioClips,
      display: ''
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleKeyOut = this.handleKeyOut.bind(this)
  }

  changeButtons() {
    if (this.state.name === 'Heater Kit') {
      this.setState({
        name: smoothPianoKit.name,
        audioClips: smoothPianoKit.audioClips,
        display: smoothPianoKit.name
      })
    } else if (this.state.name === 'Smooth Piano Kit') {
      this.setState({
        name: heaterKit.name,
        audioClips: heaterKit.audioClips,
        display: heaterKit.name
      })
    }
  }

  playAudio(e) {
    e.target.querySelector('audio').currentTime = 0
    e.target.querySelector('audio').play()
    this.setState({
      name: this.state.name,
      audioClips: this.state.audioClips,
      display: e.target.id
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
    document.addEventListener('keyup', this.handleKeyOut)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
    document.removeEventListener('keyup', this.handleKeyOut)
  }

  handleKeyPress(event) {
    const selected = this.state.audioClips.find(
      a => a.label === String.fromCharCode(event.keyCode)
    )
    console.log()
    if (selected !== undefined) {
      document.getElementById(event.key.toUpperCase()).currentTime = 0
      document.getElementById(event.key.toUpperCase()).play()
      var button = document.getElementById(selected.id)
      button.classList.add('drum-pad-active')
      this.setState({
        name: this.state.name,
        audioClips: this.state.audioClips,
        display: selected.id
      })
    }
  }

  handleKeyOut(event) {
    const selected = this.state.audioClips.find(
      a => a.label === String.fromCharCode(event.keyCode)
    )
    if (selected !== undefined) {
      var button = document.getElementById(selected.id)
      button.classList.remove('drum-pad-active')
    }
  }

  render() {
    const buttons = this.state.audioClips.map(a => (
      <div
        key={a.id}
        className="drum-pad"
        id={a.id}
        onClick={event => this.playAudio(event)}
      >
        <audio src={a.audio} className="clip" id={a.label}></audio>
        {a.label}
      </div>
    ))

    return (
      <div id="drum-machine">
        <div id="buttons-grid">{buttons}</div>
        <Display
          displayed={this.state.display}
          changeButtons={this.changeButtons.bind(this)}
        />
      </div>
    )
  }
}

export default DrumMachine
