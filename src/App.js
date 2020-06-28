import React from 'react';
import Header from './components/Header.js';
import Calculator from './components/Calculator.js';
import './App.css';

function App() {
  return (
    <div className="App">

      <Header />
      <div className="spacer"></div>
      <Calculator />

    </div>
  );
}

export default App;
