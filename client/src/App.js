import React, { useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header/Header';
import Routes from './components/routing/Routes';
// Redux
import { Provider } from 'react-redux';
import { store } from './store';
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
        <Routes />
      </Router>
    </Provider>
    );
};

export default App;
