import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../Spinner';

import { findByTestAtrr } from '../../../../utils/testFunctions';

const setUp = ( props={} ) => {
    return shallow(<Spinner {...props} />);
};

describe('Spinner Component', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    test('Should render without errors', ()=> {
        const wrapper = findByTestAtrr(component, 'spinnerComponent');
        expect(wrapper.length).toBe(1);
    });

    test('Should render a spinner image', ()=> {
        const wrapper = findByTestAtrr(component, 'spinner');
        expect(wrapper.length).toBe(1);
    });

});
