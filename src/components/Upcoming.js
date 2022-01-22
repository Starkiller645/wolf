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

  componentDidMount() {
    this.updateData()
    this.updateDataID = setInterval(30000, () => {this.updateData()})
  }

  componentWillUnmount() {
    clearInterval(this.updateDataID)
  }

  RenderEvents = () => {
    var i = 0
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
      var classes = "event"
      if(i == 0) {
        classes += " event-first"
      }
      if(i == this.state.events.length - 1) {
        classes += " event-last"
      }
      i++
      return(
        <div className={classes} style={styleColor}>
          <div className="event-container">
            <p className="event-title">{eventdata.name}</p>
            <p className="event-date day">{day}</p>
            <p className="event-date month">{month}</p>
          </div>
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
      <div className="upcoming col-1 row-10">
        <this.RenderEvents />
      </div>
    )
  }
}

export default Upcoming
