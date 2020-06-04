import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../Navbar';

import { findByTestAtrr, checkProps } from '../../../../utils/testFunctions';

describe('Navbar component', ()=> {

    describe('Checking PropTypes', ()=> {
        test('Should not throw a warning', ()=> {
            const expectProps = {
                auth: {},
                logout(){}
            };
            expect(checkProps(Navbar, expectProps)).toBeUndefined();
        });
    });

    
});