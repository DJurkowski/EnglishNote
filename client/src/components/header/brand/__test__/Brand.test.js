import React from 'react';
import { shallow } from 'enzyme';
import Brand from '../Brand';

const setUp = ( props={} ) => {
    return shallow(<Brand {...props} />);
};

const findByTestAttr = ( component, attr ) => {
    return component.find(`[data-test='${attr}']`);
};

describe('Brand component', () => {

    let component;
    beforeEach(()=> {
        component = setUp();
    });

    test('Should render a logo', () => {
        const wrapper = findByTestAttr(component, 'logo');
        expect(wrapper.length).toBe(1);
    });
    
    test('Should render a mini logo', () => {
        const wrapper = findByTestAttr(component, 'miniLogo');
        expect(wrapper.length).toBe(1);
    });

});