import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/absolute-empire.ttf'
import LiveGame from './components/LiveGame'
import reportWebVitals from './reportWebVitals';

function MainPage() {
    return(
        <>
        <LiveGame />
        <div className="headerbar">
            <p>WOLF</p>
        </div>
        </>
    )
}

ReactDOM.render(
  <MainPage />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
