import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import folder from './folder';

export default combineReducers({
    alert,
    auth,
    profile,
    folder
});