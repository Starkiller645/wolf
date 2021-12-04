import React from 'react'
import ReactDOM from 'react-dom'
import './LiveLabel.css'
const request = require('request')

class LiveLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ingame: false
    }
  }
  
  render() {
    return (
      <div className="col row-1">
        <h2 id="wolf">WOLF</h2>
        <div id="underline"></div>
        <p id="wolf-description">ONLINE LEAGUE FEED  <div style={{display: "inline"}} id="wolf-version">v0.1</div></p>
      </div>
    )
  }
}

export default LiveLabel
