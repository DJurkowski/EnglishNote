import moxios from 'moxios';
import { testStore } from '../../utils/testFunctions';
import { loadUser, login, register } from '../auth';

describe('Auth actions', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.install();
    });

    test('Should login and return user', () => {

        const expectedState = {
            id: 1,
            name: 'user',
            password: '*******',
            email: 'user@gmail.com',
            avatar: 'avatar',
            date: '2020/06/07',
            isAuthenticated: true,
            loading: false,
            token: null,
            user: null,
        };

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            }); 
        });

        return store.dispatch(login('user@gmail.com', '*******'))
        .then(() => {
            const newState = store.getState();
            expect(newState.auth).toStrictEqual(expectedState);
        });
    });

    test('Should load and return user', () => {
        const expectedState = {
            id: 1,
            name: 'user',
            password: '*******',
            email: 'user@gmail.com',
            avatar: 'avatar',
            date: '2020/06/07',
            isAuthenticated: true,
            loading: false,
            token: null,
            user: null,
        };

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            }); 
        });

        return store.dispatch(loadUser())
        .then(() => {
            const newState = store.getState();
            expect(newState.auth.user).toBe(expectedState);
        });
    });

    test('Should register and return user', () => {
        const expectedState = {
            id: 1,
            name: 'user',
            password: '*******',
            email: 'user@gmail.com',
            avatar: 'avatar',
            date: '2020/06/07',
            isAuthenticated: true,
            loading: false,
            token: null,
            user: null,
        };

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            }); 
        });

        return store.dispatch(register({name: 'user', password: '*******', email: 'user@gmail.com'}))
        .then(() => {
            const newState = store.getState();
            expect(newState.auth).toStrictEqual(expectedState);
        });
    });

});