import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { login } from './auth';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';

const API_URL = 'http://localhost:5000';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('authenticate actions', ()=> {
    
    afterEach(() => {
        nock.cleanAll()
    });

    test('creates LOGIN_SUCCESS action when user is logged in', () => {
        nock(API_URL)
        .post('/api/auth')
        .reply(200, { data: 'Logged in successfully '})
   

        const expectedActions = [
            { type: LOGIN_SUCCESS}
        ];

        const store = mockStore({ });

        store.dispatch(login('test@example.com', 'password'))
        .then(async () => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    test('creates LOGIN_FAIL if user login fails', () => {
        nock(API_URL)
        .post('/api/auth')
        .reply(404, { data: { error: 404 }})

        const expectedActions = [
            { type: LOGIN_FAIL }
        ];

        const store = mockStore({ });

        store.dispatch(login('test@example.com', 'password'))
        .then(async ()=> {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

});