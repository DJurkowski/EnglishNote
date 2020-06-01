import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from './components/header/Header';
import Routes from './components/routing/Routes';

test('renders without crashing', ()=> {
    shallow(<App />);
});

test('includes Header component', ()=> {
    const app = shallow(<App />);
    expect(app.containsMatchingElement(<Header />)).toEqual(true)
});

test('includes Routes component', ()=> {
    const app = shallow(<App />);
    expect(app.containsMatchingElement(<Routes />)).toEqual(true)
});