import React from 'react'
import ReactDOM from 'react-dom'
import './NextClash.css'
import *  as axios from 'axios'

class NextClash extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      name: "Zaun Clash",
      day: "",
      month: "",
      time: "--:--"
    }
  }

  updateData() {
    axios.get('https://lamb.jacobtye.dev/nextclash').then((res) => {  
      var jsondata = {}
      console.log(res)
      if(typeof jsondata.name == typeof undefined) {
        this.setState({
          name: "NO CLASH",
          day: "",
          month: "",
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
      <div className="col row-10 nextclash">
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
