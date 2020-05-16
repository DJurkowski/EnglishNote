import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Container from './components/container/Container';
import Header from './components/header/Header';
import Home from './components/contents/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/contents/alert/Alert';
import Dashboard from './components/contents/daszboard/Dashboard';
import CreateProfile from './components/contents/profile/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  useEffect(()=> {
    store.dispatch(loadUser());
  }, []);

  return(
    <Provider store={store}>
      <Router>
        <Header />
        <Container>    
          <Alert />
          <Route exact path='/' component={Home} />
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
          </Switch>
        </Container>
      </Router>
    </Provider>
    );
};

export default App;
