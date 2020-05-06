import React from 'react';

import './App.css';

import Squadra from './assets/Squadra.jpg';

import Routes from './routes';

function App() {
  return (
    <div className="container">
      <img src={Squadra} alt="SQUADRA" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
