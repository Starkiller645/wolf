import React from 'react'
import ReactDOM from 'react-dom'
import './NextClash.css'
const request = require('request')

class NextClash extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      name: "Zaun Clash",
      day: "--",
      month: "--",
      time: "--:--"
    }
  }

  updateData() {
    request('https://lamb.jacobtye.dev/nextclash', (err, res, body) => {
      if(err) return console.log(err)
      var jsondata = JSON.parse(body)
      if(typeof jsondata.name == typeof undefined) {
        this.setState({
          name: "NO UPCOMING CLASH",
          day: "--",
          month: "--",
          time: "--:--",
        })
      } else {
        var timedata = String(jsondata.date).split("/")
        var day = timedata[0]
        var month = timedata[1]
        var name = jsondata.name + " Clash"
        this.setState({
          name: name,
          day: day,
          month: month,
          time: jsondata.startTime,
        })
      }
    })
  }

  componentDidMount() {
    this.updateData()
    this.updateDataID = setInterval(() => {this.updateData()}, 600000)
  }

  componentWillUnmount() {
    clearInterval(this.updateDataID)
  }

  render() {
    return (
      <div className="col row-1 nextclash">
        <div className="flex-container" id="nextclash-cont">
          <div style={{display: "inline"}}><p className="clash-date">{this.state.day}</p><br/><p className="clash-date red">{this.state.month}</p></div>
          <h3 className="clash-name">{this.state.name}</h3>
        </div>
        <div className="time-disp">
          <p id="clash-time">{this.state.time}</p>
        </div>
      </div>
    )
  }
}

export default NextClash
