import React, { Component } from 'react'
import ReactGA from 'react-ga';

import Navbar from './components/Navbar'
import Graph from './components/Graph'
import Typewriter from './components/Typewriter'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.wpmHandle = this.wpmHandle.bind(this)

    this.state = {
        wpm: [],
    }
}

  componentDidMount(){
    // Initialize GA
    ReactGA.initialize('UA-54793468-7');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  wpmHandle(wpms) {
    this.setState({
      wpm: wpms
    })
  }
  
  render() {
    return (
      <div id="app">
  
          <Navbar />
  
          <Graph wpmList={this.state.wpm}/>
  
          <div className="content">
            <Typewriter wpmList={this.wpmHandle}/>
          </div>
  
  
          <style jsx>{`
              #app {
                text-align: center;
                background-color: #282c34;
              }
  
              .content {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: calc(10px + 2vmin);
                color: white;
              }
          `}</style>
  
      </div>
    );
  }

}