import React from "react";
import "./Live.css";

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.sock = new WebSocket("wss://lamb.jacobtye.dev:3081/");
    this.sock.onmessage = (event) => {
      this.setState(JSON.parse(event.data).data);
    };
    this.state = {
      phase: "champ-select",
      ally: {
        pick: [
          {
            championID: 32,
          },
        ],
      },
    };
  }

  ChampsList = () => {
    if (this.state.phase !== "champ-select") return <p>NOT IN CHAMP SELECT</p>;
    var ally_images = [];
    for (let i = 0; i < 5; i++) {
      ally_images.push(
        <img src="https://picsum.photos/150/150" alt="placeholder" />
      );
    }

    if (typeof this.state.ally.pick === typeof undefined)
      return { ally_images };
    console.log(this.state.ally.pick);
    if (this.state.ally.pick.length > 0) {
      for (var champ of this.state.ally.pick) {
        if (typeof champ.championName !== typeof undefined) {
          console.log(champ.championName);
          let temp = champ.championName;
          temp = temp.replace(/ /g, "-");
          let champName = champ["championName"];
          temp = temp.replace(/['.]/gi, "");
          temp = temp.replace(/&/g, "amp");
          ally_images[champ["cellID"]] = (
            <img
              alt={champName}
              key={champName}
              src={`https://mobafire.com/images/avatars/${temp.toLowerCase()}-classic.png`}
            />
          );
        }
      }
    }

    return <>{ally_images}</>;
  };

  PositionsList = () => {
    if (this.state.phase !== "champ-select") return <p>NOT IN CHAMP SELECT</p>;
    if (typeof this.state.ally.pick === typeof undefined)
      return <p>NO ALLY PICKS</p>;
    const champ_select = this.state.ally.pick.map((summoner) => {
      return <p className="summoner-name">{summoner.championName}</p>;
    });
    return <>{champ_select}</>;
  };

  render() {
    return (
      <div className="col row-20 live component">
        <p>LIVE</p>
        <this.ChampsList />
      </div>
    );
  }
}

export default Live;
