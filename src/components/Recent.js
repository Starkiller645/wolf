import React from 'react'
import ReactDOM from 'react-dom'
import * as axios from 'axios'
import './Recent.css'

class Recent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [
        {
          won: true,
          wasDraw: false,
          playerCount: 2,
          teamScore: 58,
          enemyScore: 39,
          gameType: "SR Ranked Flex 5v5",
          timestamp: 1638640729276
        }
      ]
    }
  }

  updateData() {
    axios.get('https://lamb.jacobtye.dev/recent').then((res) => {
      var jsondata = res.data
      jsondata = jsondata.slice(0, 5)
      this.setState({
        games: jsondata
      })
    })
  }

  componentDidMount() {
    this.updateData()
    setInterval(10000, () => {this.updateData()})
  }

  returnGamesList = () => {
    var GameList = this.state.games.map((game, num) => {
      var playerCount = []
      for(var i = 0; i < game.playerCount; i++) {
        playerCount.push(
          <div className="small-circle">*</div>
        )
      }

      var class_name = "game"
      var res_col = "#353535"
      var text = "D"
      var text_col = "#f0f0f0"
      var res_class = "result"
      if(num == 0) {
        class_name += " first-game"
        res_class += " result-first"
      }
      if(num == this.state.games.length - 1) {
        class_name += " last-game"
        res_class += " result-last"
      }
      console.log(class_name)
      console.log(game)
      if(game["won"] === true) {
        res_col = "#00ccd3"
        text = "W"
        text_col = "#1f1f1f"
      } else {
        res_col = "#ff4500"
        text = "L"
        text_col = "#f0f0f0"
      }

      var res_style = {
        "--res-col": res_col,
        color: text_col,
      }

      var date = new Date(game.timestamp)
      var day = date.getDay()
      var month = date.getMonth()
      var display_date = String(day) + "/" + String(month)


      return(
        <div className={class_name}>
          <div className="content">
            <p className="gametype">{game.gameType}</p>
            <div className="scores">
              <h3 className="ally-score">{game.teamScore}</h3>
              <h3 className="enemy-score">{game.enemyScore}</h3>
            </div>
            <div className="player-count">
              {playerCount}
            </div>
          </div>
          <div className={res_class} style={res_style}>
            <p className="date">{"--:--"}</p>
            <p className="res-letter">{text}</p>
            <p className="date">{display_date}</p>
          </div>
        </div>
      )
    })
    return(
      <>
        {GameList}
      </>
    )

  }

  render() {
    return (
      <div className="col row-35 recent">
        <this.returnGamesList />
      </div>
    )
  }
}

export default Recent
