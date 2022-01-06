import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';
import Docs from './Docs';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Realizacja zadania nr1 w ramach laboratorium PFSwChO</h1>
          <h2>Dominik Kondraciuk</h2>
          <Link to="/">Home</Link>
          <Link to="/calculator">FibCal</Link>
          <Link to="/docs">Dokumentacja</Link>
        <div>
          <Route path="/calculator" component={Fib} />
          <Route path="/docs" component={Docs} />
        </div>
        </header>

      </div>
    </Router>
  );
}

export default App;
