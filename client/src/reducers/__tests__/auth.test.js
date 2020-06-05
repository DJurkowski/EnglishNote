import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, 
    AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DELETE_USER } from '../../actions/types';
import auth from '../auth';

describe('Auth reducer', () => {

    test('Should return default state', () => {
        const newState = auth(undefined, {});

        const defaultState = {
            token: localStorage.getItem('token'),
            isAuthenticated: null,
            loading: true,
            user: null
        };

        expect(newState).toEqual(defaultState);
    });


    const expectSameArr = [AUTH_ERROR, LOGIN_FAIL, LOGOUT, DELETE_USER ];

    for(let x of expectSameArr) {
        test(`Should return clear state if receiving type ${x}`, () => {
            const oldState = { token: '1234567', isAuthenticated: true, loading: true };
            const newState = auth(oldState, {
                type: x
            });
            const expectedState = { token: null, isAuthenticated: false, loading: false };
    
            expect(newState).toEqual(expectedState);
        });
    };

});