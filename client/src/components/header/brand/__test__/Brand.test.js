import React from 'react';
import { shallow } from 'enzyme';
import Brand from '../Brand';

import { findByTestAtrr } from '../../../../utils/testFunctions';

const setUp = ( props={} ) => {
    return shallow(<Brand {...props} />);
};

describe('Brand component', () => {

    let component;
    beforeEach(()=> {
        component = setUp();
    });

    test('Should render a logo', () => {
        const wrapper = findByTestAtrr(component, 'logo');
        expect(wrapper.length).toBe(1);
    });
    
    test('Should render a mini logo', () => {
        const wrapper = findByTestAtrr(component, 'miniLogo');
        expect(wrapper.length).toBe(1);
    });

});