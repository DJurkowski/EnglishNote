import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/index';
import { middleware } from '../store';

export const findByTestAtrr = ( component, attr ) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProps = ( component, expectedProps ) => {
    const propErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
    return propErr;
};

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};