import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';

const App = () => (
  <>
    <Router>
      <Header />
      <h1>App</h1>
    </Router>
  </>
);

export default App;
