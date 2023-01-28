import React from 'react'
import Toggler from './Toggler'

class Display extends React.Component {
  changeButtons() {
    this.props.changeButtons()
  }

  render() {
    return (
      <div id="display">
        <div id="display-box">
          <div id="displayed">{this.props.displayed}</div>
        </div>

        <div id="change-buttons">
          <Toggler changeButtons={this.changeButtons.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Display
