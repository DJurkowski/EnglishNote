import React from 'react';
import { shallow } from 'enzyme';
import Collapsemenu from '../Collapsemenu';

import { findByTestAtrr, checkProps } from '../../../../utils/testFunctions';

describe('Collapsemenu component', ()=> {

    describe('Checking PropTypes', ()=> {

        test('Should not throw a warning', ()=> {
            const expectProps = {
                auth: {},
                logout(){}
            };
            expect(checkProps(Collapsemenu, expectProps)).toBeUndefined();
        });
    });

});