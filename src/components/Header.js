import React from 'react';
import '../App.css';

function Header() {
  return (
    <header className="App-header">
      <ul className="header-nav-bar">
        <li className="project-title"><a href="https://annethor.github.io/javascript-calculator">Javascript Calculator</a></li>
        <li className="home"><a href="https://annethor.github.io" target="_">Back to Portfolio</a></li>
        <li className="author">Designed & Coded by Anne Thorsteinson</li>
      </ul>
    </header>
  );
}

export default Header;
