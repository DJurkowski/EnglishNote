import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './components/contents/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
    <Router>
      <Header />
      <Route exact path='/' component={Home} />
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </Router>
);

export default App;
