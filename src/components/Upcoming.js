import React from 'react'
import ReactDOM from 'react-dom'
import * as axios from 'axios'
import './Upcoming.css'

class Upcoming extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      events: [{
        name: "Ixtal Clash",
        date: "4/12",
        type: "tourney",
        timestamp: 1638576000
      }]
    }
  }
    
  updateData() {
    axios.get("https://lamb.jacobtye.dev/upcoming").then(res => {
      var jsondata = res.data
      this.setState({
        events: jsondata
      })
    })
  }

  RenderEvents = () => {
    var ev = this.state.events.map((eventdata) => {
      var color = "#2a2a2a"
      var textCol = "#0f0f0f"
      var day = eventdata.date.split("/")[0]
      var month = eventdata.date.split("/")[1]
      switch(eventdata.type) {
        case "clash":
          color = "#00ccd3"
          break
        case "training":
          color = "#2a2a2a"
          textCol = "#ff4500"
          break
        case "tourney":
          color = "#ff4500"
          break
      }
      var styleColor = {
        "--col": color,
        "--textcol": textCol
      }
      return(
        <div className="event" style={styleColor}>
          <p className="event-title">{eventdata.name}</p>
          <p className="event-date day">{day}</p>
          <p className="event-date month">{month}</p>
        </div>
      )
    })
    return(
      <>
        {ev}
      </>
    )
  }

  render() {
    return (
      <div className="upcoming column row-10">
        <this.RenderEvents />
      </div>
    )
  }
}

export default Upcoming
