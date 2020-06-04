import React from 'react';
import { shallow } from 'enzyme';
import Burgermenu from '../Burgermenu';

import { findByTestAtrr } from '../../../../utils/testFunctions';

const setUp = ( props={} ) => {
    return shallow(<Burgermenu {...props} />);
};

describe('Burgermenu component', ()=> {

    let component;
    beforeEach(()=> {
        component = setUp();
    });

    test('Should render wihout errors', ()=> {
        const wrapper = findByTestAtrr(component, 'wrapper');
        expect(wrapper.length).toBe(1);
    });

    test('Should render burgermenu stripes', ()=> {
        const wrapper = findByTestAtrr(component, 'stripes');
        expect(wrapper.length).toBe(1);
    });
});