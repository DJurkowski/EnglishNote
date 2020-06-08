import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound';

import { findByTestAtrr } from '../../../../utils/testFunctions';

const setUp = ( props={} ) => {
    return shallow(<NotFound {...props} />);
};

describe('NotFound component', ()=> {

    let component;
    beforeEach(()=> {
        component = setUp();
    });

    test('Should render wihout errors', ()=> {
        const wrapper = findByTestAtrr(component, 'wrapper');
        expect(wrapper.length).toBe(1);
    });

    test('Should render notfound content div', ()=> {
        const wrapper = findByTestAtrr(component, 'content');
        expect(wrapper.length).toBe(1);
    });

    test('Should render notfound box div', ()=> {
        const wrapper = findByTestAtrr(component, 'box');
        expect(wrapper.length).toBe(1);
    });

    test('Should renders correctly text in p selector', ()=> {
        const expectedText = 'Sorry for the issues';
        expect(component.find('p').text()).toEqual(expectedText);
    });

    test('Should renders correctly text in h1 selector', ()=> {
        const expectedText = ' Page Not Found';
        expect(component.find('h1').text()).toEqual(expectedText);
    });
});