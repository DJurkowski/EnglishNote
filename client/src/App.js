import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Container from './components/container/Container';
import Header from './components/header/Header';
import Home from './components/contents/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/contents/alert/Alert';
import Dashboard from './components/contents/daszboard/Dashboard';
import CreateProfile from './components/contents/profile/CreateProfile';
import EditProfile from './components/contents/profile/EditProfile';
import MyFolders from './components/contents/folder/MyFolders';
import AllFolders from './components/contents/folder/AllFolders';
import CreateFolder from './components/contents/folder/CreateFolder';
import Folder from './components/contents/folder/Folder';
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
            <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
            <PrivateRoute exact path='/myfolders' component={MyFolders}/>
            <PrivateRoute exact path='/allfolders' component={AllFolders}/>
            <PrivateRoute exact path='/create-folder' component={CreateFolder}/>
            <PrivateRoute exact path='/folder/:id' component={Folder}/>
          </Switch>
        </Container>
      </Router>
    </Provider>
    );
};

export default App;
