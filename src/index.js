import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./fonts/absolute-empire.ttf";
import LiveGame from "./components/LiveGame";
import LiveLabel from "./components/LiveLabel";
import NextClash from "./components/NextClash";
import Team from "./components/Team";
import Recent from "./components/Recent";
import Upcoming from "./components/Upcoming";
import Live from "./components/Live";
import reportWebVitals from "./reportWebVitals";
import flv from "flv";
import { ReactFlvPlayer } from "react-flv-player";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth };
  }

  handleResize = (e) => {
    this.setState({
      width: window.innerWidth,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    const { width } = this.state;
    if (width < 950) {
      return (
        <>
          <div className="column scrollbox">
            <LiveLabel />
            <LiveGame />
            <NextClash />
            <Recent />
            <Upcoming />
            <Team />
          </div>
        </>
      );
    } else if (width < 1300) {
      return (
        <>
          <div className="column scrollbox">
            <div className="col-1">
              <LiveLabel />
              <LiveGame />
              <Recent />
            </div>
            <div className="col-1">
              <NextClash />
              <Team />
              <Upcoming />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="column scrollbox">
            <div className="col-1">
              <Recent />
            </div>
            <div className="col-1">
              <LiveLabel />
              <LiveGame />
              <NextClash />
            </div>
            <div className="col-1">
              <Team />
              <Upcoming />
            </div>
          </div>
        </>
      );
    }
  }
}

/*class Live extends React.Component {
  constructor(props) {
    super(props);
  }

  handleResize = (e) => {
    this.setState({
      width: window.innerWidth,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <>
        <ReactFlvPlayer
          url="https://jacobtye.dev:8443/live/league.flv"
          isLive={true}
        />
      </>
    );
  }
}*/

ReactDOM.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />}></Route>
        <Route exact path="/live" element={<Live />}></Route>
        <Route exact path="/clash" element={<div>Clash</div>}></Route>
      </Routes>
    </BrowserRouter>
    <div className="headerbar">
      WOLF<span style={{ color: "#fafafa" }}> beta</span>
    </div>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
