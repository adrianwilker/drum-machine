import React from 'react'

class Toggler extends React.Component {
  constructor(props) {
    super(props)
    this.pressTogglerInner = this.pressTogglerInner.bind(this)
  }

  pressTogglerInner(e) {
    var toggler =
      e.target.id === 'toggler-box'
        ? document.getElementById('toggler-inner')
        : e.target

    toggler.style.float === 'right'
      ? (toggler.style.float = 'left')
      : (toggler.style.float = 'right')
    this.props.changeButtons()
  }

  render() {
    return (
      <div id="toggler-box" onClick={this.pressTogglerInner}>
        <div id="toggler-inner"></div>
      </div>
    )
  }
}

export default Toggler
