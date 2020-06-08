import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from '../../../../utils/testFunctions';
import Alert from '../Alert';

describe('Alert Component', () => {

    describe('Checking PropTypes', () => {

        test('Should NOT throw a warning', () => {
            const expectedProps = {
                alerts: []
            };
            const propsError = checkProps(Alert, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });
});