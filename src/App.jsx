import React from 'react';
import ReactGA from 'react-ga';

import Typewriter from './components/Typewriter'
import Navbar from './components/Navbar'

function App() {

  // Initialize GA
  ReactGA.initialize('UA-54793468-7');
  ReactGA.pageview(window.location.pathname + window.location.search);
  
  return (
    <div id="app">

        <Navbar />

        <div className="content">
          <Typewriter />
        </div>


        <style jsx>{`
            #app {
              text-align: center;
            }

            .content {
              background-color: #282c34;
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

export default App;
