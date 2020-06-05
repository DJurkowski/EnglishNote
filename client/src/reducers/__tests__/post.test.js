import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, 
    GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../../actions/types';

import post from '../post';

describe('Post reducer', () => {

    test('Should return default state', () => {
        const newState = post(undefined, {});

        const defaultState = {
            posts: [],
            post: null,
            loading: true,
            error: {}
        };

        expect(newState).toEqual(defaultState);
    });

    test('Should return error state if receiving type POST_ERROR', () => {
        const payload = { msg: 'Error', status: '500'};
        const newState = post(undefined, {
            type: POST_ERROR,
            payload
        });
        const expectedState = { posts: [], post: null, error: payload, loading: false };

        expect(newState).toEqual(expectedState);
    });
});