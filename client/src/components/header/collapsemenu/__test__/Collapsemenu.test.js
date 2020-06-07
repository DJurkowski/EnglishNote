import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Collapsemenu from '../Collapsemenu';

import { findByTestAtrr, checkProps, testStore } from '../../../../utils/testFunctions';

// const setUp = (initialState={}, props={}) => {
//     const store = testStore(initialState);
//     const wrapper = mount(<Provider store={store}><Collapsemenu {...props}/></Provider>);
//     console.log(wrapper.debug());
//     return wrapper;
// };

describe('Collapsemenu component', ()=> {

    // describe('Render component elements', ()=> {
    //     test('Should return null', ()=> {
    //         const initialProps = {
    //             auth: {
    //                 isAuthenticated: true,
    //                 loading: false
    //             },
    //             logout(){},
    //             navbarState: false,
    //             handleNavbar(){}
    //         }
    //         const component = setUp({},initialProps);
    //         expect(component).toBeEmpty();
    //     });

    // });

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