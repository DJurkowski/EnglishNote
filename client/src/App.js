import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Container from './components/container/Container';
import Header from './components/header/Header';
import Home from './components/contents/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/contents/alert/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Container>    
        <Alert />
        <Route exact path='/' component={Home} />
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
      </Container>
    </Router>
  </Provider>
);

export default App;
