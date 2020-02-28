import React from 'react';
import ReactGA from 'react-ga';
import './App.css';

import Typewriter from './components/Typewriter'

function App() {

  // Initialize GA
  ReactGA.initialize('UA-54793468-7');
  ReactGA.pageview(window.location.pathname + window.location.search);
  
  return (
    <div className="App">
      <header className="App-header">

        <h1> typeroo </h1>

        <Typewriter />
      
      </header>
    </div>
  );
}

export default App;
