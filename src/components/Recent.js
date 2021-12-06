import React from 'react'
import ReactDOM from 'react-dom'
import './LiveGame.css'
const request = require('request')

class Recent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col row-40" id="recent" style={{background: "yellow"}}></div>
    )
  }
}

export default Recent
