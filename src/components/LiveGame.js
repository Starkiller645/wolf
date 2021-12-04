import React from 'react'
import ReactDOM from 'react-dom'
import './LiveGame.css'
const request = require('request')

class LiveGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ally: {
        kills: "-",
        champs: []
      },
      enemy: {
        kills: "-",
        champs: []
      },
      gametype: "NO ACTIVE GAME",
      time: "--:--",
      starttime: 0,
      ingame: false,
    }
    // Demo state for testing frontend
    /*this.state = {
      ally: {
        kills: 24,
        champs: ["Aatrox", "Kindred", "Yone", "Jinx", "Bard"]
      },
      enemy: {
        kills: 16,
        champs: ["Dr. Mundo", "Kha'Zix", "Tahm Kench", "Caitlyn", "Nautilus"]
      },
      gametype: "RANKED SOLO/DUO 5v5",
      time: "",
      starttime: 1638549114,
      ingame: true,
    }*/

  }

  EnemyChampsList = () => {
    if(!this.state.ingame) return null
    var i = 0;
    const enemy_images = this.state.enemy.champs.map(champ => {
      i++;
      var temp = champ.replace(/ /g, '-')
      temp = temp.replace(/\./, '')
      temp = temp.replace(/\'/, '')
      temp = temp.replace(/&/, 'amp')
      return <img alt={champ} key={temp} src={`https://mobafire.com/images/avatars/${temp.toLowerCase()}-classic.png`} className="enemy-champ-img" style={{"--num": i}}/>
    })
    return (
      <div className="enemy-champs">
        { enemy_images }
      </div>
    )
  }

  AllyChampsList = () => {
    if(!this.state.ingame) {
        return null
    }
    var i = 0;
    const ally_images = this.state.ally.champs.map(champ => {
      i++;
      var style = {
        "--num": i,
        "--total": this.state.ally.champs.length,
      }
      return <img alt={champ} key={champ} src={`https://mobafire.com/images/avatars/${champ.toLowerCase()}-classic.png`} className="ally-champ-img" style={style}a/>
    })
    return(
      <div className="ally-champs">
        { ally_images }
      </div>
    )
  }

  updateTime() {
    if(!this.state.ingame) return null
    const timestamp = Math.round((Date.now() / 1000) - this.state.starttime)
    var secs = String(timestamp % 60)
    var mins = String(Math.floor(timestamp / 60))
    if(secs < 10) {
      secs = "0" + secs
    }
    this.setState({
      time: mins + ":" + secs
    })
  }

  updateData() {
    request('https://lamb.jacobtye.dev/livegame', (err, res, body) => {
      if(err) return console.log(err)
      var jsondata = JSON.parse(body)
      console.log(jsondata)
      if(typeof jsondata.ally != typeof undefined) {
        this.setState({
          ally: jsondata.ally,
          enemy: jsondata.enemy,
          gametype: jsondata.gametype,
          starttime: jsondata.starttime,
          ingame: true
        })
      } else {
        this.setState({
            ally: {kills: "-"},
            enemy: {kills: "-"},
            gametype: "NO ACTIVE GAME",
            time: "--:--",
            ingame: false
        })
      }
    })
  }

  componentDidMount() { 
    this.updateTimeID = setInterval(() => {this.updateTime()}, 1000)
    this.updateDataID = setInterval(() => {this.updateData()}, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeID)
    clearInterval(this.updateDataID)
  }

  render() {
    console.log(typeof this.state.ally.champs != typeof undefined)
   
      return (
        <div className="livegame row-15 col">
          <p id="game-type">{this.state.gametype}</p>
          <div className="flex-container" id="score-cont">
              <h3 className="score ally">{this.state.ally.kills}</h3>
              <h3 className="score enemy">{this.state.enemy.kills}</h3>
          </div>
          <div className="flex-container" id="champs-list">
            <this.AllyChampsList />
            <this.EnemyChampsList />
          </div>
          <div className="time-disp">
            <p id="game-time">{this.state.time}</p>
          </div>
        </div>
      )
    
  }

}
export default LiveGame
