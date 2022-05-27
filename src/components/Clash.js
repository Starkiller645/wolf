import React from 'react'
import ReactDOM from 'react-dom'
import Bans from './Bans.js'
import '../index.css'

class Clash extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {}
    }
  
  render() {
    return (
      <div className="column scrollbox">
        <div className="col-1">
          <Bans />
        </div>
      </div>
    )
  }
    
}

export default Clash
