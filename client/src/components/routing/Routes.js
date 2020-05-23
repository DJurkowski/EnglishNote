import React from 'react';
import { Route, Switch } from 'react-router-dom'; 
import Container from '../container/Container';
import Home from '../contents/home/Home';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../contents/alert/Alert';
import Dashboard from '../contents/daszboard/Dashboard';
import CreateProfile from '../contents/profile/CreateProfile';
import EditProfile from '../contents/profile/EditProfile';
import MyFolders from '../contents/folder/MyFolders';
import AllFolders from '../contents/folder/AllFolders';
import CreateFolder from '../contents/folder/CreateFolder';
import Folder from '../contents/folder/Folder';
import EditFolder from '../contents/folder/EditFolder';
import Profiles from '../contents/profile/Profiles';
import Profile from '../contents/profile/Profile';
import Posts from '../contents/post/Posts';
import Post from '../contents/post/Post';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../contents/error/NotFound';

const Routes = () => (
    <Container>    
          <Alert />
          <Switch>
            <Route exact path='/' component={Home} /> 
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <PrivateRoute exact path='/profiles' component={Profiles}/>
            <PrivateRoute exact path='/profile/:id' component={Profile}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
            <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
            <PrivateRoute exact path='/myfolders' component={MyFolders}/>
            <PrivateRoute exact path='/allfolders' component={AllFolders}/>
            <PrivateRoute exact path='/create-folder' component={CreateFolder}/>
            <PrivateRoute exact path='/folder/:id' component={Folder}/>
            <PrivateRoute exact path='/folder/edit/:id' component={EditFolder}/>
            <PrivateRoute exact path='/posts' component={Posts}/>
            <PrivateRoute exact path='/post/:id' component={Post}/>
            <Route component={NotFound} />
          </Switch>
        </Container>
);

export default Routes;