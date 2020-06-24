import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <ul className="header-nav-bar">
          <li className="project-title"><a href="https://annethor.github.io/javascript-calculator">Javascript Calculator</a></li>
          <li className="home"><a href="https://annethor.github.io" target="_">Back to Portfolio</a></li>
          <li className="author">Designed & Coded by Anne Thorsteinson</li>
        </ul>
      </header>

      <div id="calculator-display">

        <section id="display">
          Here is where we will put the inputs
        </section>

        <section id="calculator-buttons">
          Here is where we will put buttons
        </section>

      </div>


    </div>
  );
}

export default App;
