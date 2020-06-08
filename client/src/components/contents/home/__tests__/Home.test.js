import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';
import { findByTestAtrr, testStore, checkProps } from '../../../../utils/testFunctions';

const setUp = ( initialState={} ) => {
    const store = testStore(initialState);
    return shallow(<Home store={store} />).childAt(0).dive();
};

describe('Home component', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    test('Should render without errors', () => {
        const wrapper = findByTestAtrr(component, 'wrapper');
        expect(wrapper.length).toBe(1);
    });

    test('Should render card div', () => {
        const wrapper = findByTestAtrr(component, 'card');
        expect(wrapper.length).toBe(1);
    });

    describe('Checking PropTypes', () => {

        test('Should NOT throw a warning', () => {
            const expectedProps = {
                auth: {}
            };
            const propsError = checkProps(Home, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });
});