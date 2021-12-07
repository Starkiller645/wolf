import React from 'react'
import ReactDOM from 'react-dom'
import './Team.css'
import * as axios from 'axios'

import TopIcon from './assets/lol/top-icon.png'
import JglIcon from './assets/lol/jgl-icon.png'
import MidIcon from './assets/lol/mid-icon.png'
import BotIcon from './assets/lol/bot-icon.png'
import SupIcon from './assets/lol/sup-icon.png'


class Team extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      summoners: []
    }
  }

  PlayersList = () => {
    var i = 0;
    const players = this.state.summoners.map(summoner => {
      console.log(summoner.name)
      var temp = summoner.mains[0]
      temp = temp.replace(/ /g, '-')
      temp = temp.replace(/\./, '')
      temp = temp.replace(/\'/, '')
      temp = temp.replace(/&/, 'amp')
      var pos_img;
      switch(summoner.position) {
        case "top":
          pos_img = <img alt={summoner.position} key={summoner.position} src={TopIcon} className="pos-icon" />
          break
        case "jgl":
          pos_img = <img alt={summoner.position} key={summoner.position} src={JglIcon} className="pos-icon" />
          break
        case "mid":
          pos_img = <img alt={summoner.position} key={summoner.position} src={MidIcon} className="pos-icon" />
          break
        case "bot":
          pos_img = <img alt={summoner.position} key={summoner.position} src={BotIcon} className="pos-icon" />
          break
        case "sup":
          pos_img = <img alt={summoner.position} key={summoner.position} src={SupIcon} className="pos-icon" />
          break
      }
      var color;
      console.log(i % 2 == 0)
      if(i % 2 == 0) {
        color = "#2a2a2a"
      } else {
        color = "#1f1f1f"
      }
      var class_name = "summoner"
      if(i == 0) {
        class_name += " first"
      }
      if(i == this.state.summoners.length - 1) {
        class_name += " last"
      }

      var img_class = "champ-img"
      if(i == 0) {
        img_class += " champ-img-first"
      }
      if(i == this.state.summoners.length - 1) {
        img_class += " champ-img-last"
      }


      console.log(class_name)
      i++
      return(
        <div className={class_name} style={{"--col": color}}>
          {pos_img}
          <p className="summoner-name">{summoner.name}</p>
            <img alt={summoner.mains[0]} key={summoner.mains[0]} src={`https://mobafire.com/images/avatars/${temp.toLowerCase()}-classic.png`} className={img_class} />
        </div>
      )
    })
    return(
      <>
        {players}
      </>
    )
  }

  updatePlayers() {
    console.log("Updating players")
    axios.get('https://lamb.jacobtye.dev/team').then((res) => {
      var jsondata = res.data
      console.log(res)
      this.setState({
        summoners: jsondata
      })
    })
  }

  componentDidMount() {
    this.updatePlayersID = setInterval(() => {this.updatePlayers()}, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.updatePlayersID)
  }

  render() {
    return(
      <div className="col row-20 team component">
        <this.PlayersList />
      </div>
    )
  }
}

export default Team
