import React from 'react';
import { shallow } from 'enzyme';
import DropDownMenu from '../DropDownMenu';

import { findByTestAtrr } from '../../../../utils/testFunctions';

const setUp = ( props={} ) => {
    return shallow(<DropDownMenu {...props} />);
};

describe('DropDownMenu component', ()=> {

    let component;
    beforeEach(()=>{
        component = setUp();
    });

    test('Should render wihout errors',()=> {
        const wrapper = findByTestAtrr(component, 'dropDownMenuComponent');
        expect(wrapper.length).toBe(1);
    });

    test('Should render drop down menu button',()=> {
        const wrapper = findByTestAtrr(component, 'button');
        expect(wrapper.length).toBe(1);
    });

    test('Should render drop down menu list',()=> {
        component.find('button').simulate('click');
        const wrapper = findByTestAtrr(component, 'dropDownMenuList');
        expect(wrapper.length).toBe(1);
    });
    
});