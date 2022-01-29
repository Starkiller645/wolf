import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/absolute-empire.ttf'
import LiveGame from './components/LiveGame'
import LiveLabel from './components/LiveLabel'
import NextClash from './components/NextClash'
import Team from './components/Team'
import Recent from './components/Recent'
import Upcoming from './components/Upcoming'
import reportWebVitals from './reportWebVitals';

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {width: window.innerWidth}
    }

    handleResize = (e) => {
        this.setState({
            width: window.innerWidth
        })
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize)
    }

    render() {
        const {width} = this.state
        if(width < 950) {
            return(
                <>
                <div className="column scrollbox">
                    <LiveLabel />
                    <LiveGame />
                    <NextClash />
                    <Recent />
                    <Upcoming />
                    <Team />
                </div>
                <div className="headerbar">
                    <p>WOLF</p>
                </div>
                </>
            )
        } else if(width < 1300) {
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
                <div className="headerbar">
                    <p>WOLF</p>
                </div>
                </>
            )
        } else {
            return(
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
            )
        }
    }
}

ReactDOM.render(
  <> 
      <MainPage />
      <div className="headerbar">WOLF<span style={{"color": "#fafafa"}}> beta</span></div>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
