import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialState = {};

export const middleware = [thunk];

export const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(...middleware))(createStore);

// const store = createStore(rootReducer, 
//     initialState, 
//     composeWithDevTools(applyMiddleware(...middleware))
// );

export const store = createStoreWithMiddleware(rootReducer, initialState);