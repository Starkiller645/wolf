import React from 'react'
import ReactDOM from 'react-dom'
import './LiveLabel.css'
import Logo from './assets/wolf-logo.png'

class LiveLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ingame: false
    }
  }
  
  render() {
    return (
      <div className="col row-10">
        <img id="wolf" src={Logo}/>
      </div>
    )
  }
}

export default LiveLabel
