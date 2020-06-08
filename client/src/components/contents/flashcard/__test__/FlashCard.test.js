import React from 'react';
import { shallow } from 'enzyme';
import FlashCard from '../FlashCard';

import { findByTestAtrr } from '../../../../utils/testFunctions';

const setUp = ( props={} ) => {
    return shallow(<FlashCard {...props} />);
};

describe('FlashCard component', ()=> {

    let component;
    beforeEach(()=> {
        const testWord = {
            _id: 1,
            englishword: 'test_front',
            polishword: 'test_back',
            synonyms: ['test_syn']
        };
        component = setUp({word: testWord});
    });
    
    test('Should render wihout errors', () => {
        const wrapper = findByTestAtrr(component, 'card');
        expect(wrapper.length).toBe(1);
    });

    test('Should render front card wrapper div', () => {
        const wrapper = findByTestAtrr(component, 'front');
        expect(wrapper.length).toBe(1);
    });
    
    test('Should render back card wrapper div', () => {
        const wrapper = findByTestAtrr(component, 'back');
        // 1 because synonyms array is not empty
        // if synonyms array is empty it would be 0
        expect(wrapper.length).toBe(1);
    });

    test('Should render englishword text from test word', () => {
        const expectedWord = 'test_front';
        const wrapper = findByTestAtrr(component, 'front');
        expect(wrapper.find('h3').text()).toEqual(expectedWord);
    });
    
    test('Should render polishword text from test word', () => {
        const expectedWord = 'test_back';
        const wrapper = findByTestAtrr(component, 'back');
        expect(wrapper.find('h3').text()).toEqual(expectedWord);
    });

});