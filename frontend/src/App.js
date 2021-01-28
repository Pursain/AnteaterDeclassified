import './App.css';

import React from 'react';
import { Coursepage } from './components/routes/Coursepage'
import { Homepage } from './components/routes/Homepage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/:course">
            <Coursepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
