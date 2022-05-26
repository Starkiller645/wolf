import React from 'react'
import ReactDOM from 'react-dom'
import './LiveGame.css'
import * as axios from 'axios'

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
    if(this.state.ingame) {
    var i = 0;
    const enemy_images = this.state.enemy.champs.map(champ => {
      i++;
      var temp = champ.replace(/ /g, '-')
      temp = temp.replace(/['\.]/gi, "")
      temp = temp.replace(/\&/g, 'amp')
      return <img alt={champ} key={temp} src={`https://mobafire.com/images/avatars/${temp.toLowerCase()}-classic.png`} className="enemy-champ-img" style={{"--num": i}}/>
        })
      while(enemy_images.length < 5) {
        i++
        enemy_images.push(<img alt="Placeholder" src="/placeholder.png" style={{"--num": i}} className="enemy-champ-img"/>)
      }
    return (
      <div className="enemy-champs">
        { enemy_images }
      </div>
    )
    } else {
	return null
    }
  }

  AllyChampsList = () => {
    if(this.state.ingame) {
    var i = 0;
    const ally_images = this.state.ally.champs.map(champ => {
      i++;
      var temp = champ.replace(/ /g, '-')
      temp = temp.replace(/['\.]/gi, "")
      temp = temp.replace(/\&/g, 'amp')

      var style = {
        "--num": i,
        "--total": 5,
      }
      return <img alt={champ} key={champ} src={`https://mobafire.com/images/avatars/${temp.toLowerCase()}-classic.png`} className="ally-champ-img" style={style}/>
    })
    while(ally_images.length < 5) {
        i++
        var style = {
          "--num": i,
          "--total": 5,
        }
        ally_images.push(<img alt="Placeholder" src="/placeholder.png" style={style} className="ally-champ-img"/>)
    }
    return(
      <div className="ally-champs">
        { ally_images }
      </div>
    )
    } else {
	return null
    }
  }

  updateTime() {
    if(!this.state.ingame) return null
    var timestamp = Math.round(Date.now() - this.state.starttime)
    timestamp = timestamp / 1000
    var secs = String(Math.round(timestamp % 60))
    var mins = String(Math.round(Math.floor(timestamp / 60)))
    if(secs < 10) {
      secs = "0" + secs
    }
    this.setState({
      time: mins + ":" + secs
    })
  }

  updateData() {
    axios.get('https://lamb.jacobtye.dev/livegame').then((res) => {
      var jsondata = res.data
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
	    ally: {champs: [], kills: "-"},
            enemy: {champs: [], kills: "-"},
            gametype: "NO ACTIVE GAME",
            time: "--:--",
            ingame: false
        })
      }
      console.log(this.state)
    })
  }

  componentDidMount() { 
    this.updateTime()
    this.updateData()
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
