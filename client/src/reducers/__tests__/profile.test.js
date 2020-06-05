import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE,
    GET_PROFILES, GET_REPOS } from "../../actions/types";

import profile from '../profile';

describe('Profile reducer', () => {

    test('Should return default state', () => {
        const newState = profile(undefined, {});

        const defaultState = {
            profile: null,
            profiles: [],
            repos: [],
            loading: true,
            error: {}
        };

        expect(newState).toEqual(defaultState);
    });

    test('Should return error state if receiving type PROFILE_ERROR', () => {
        const payload = { msg: 'Error', status: '500'};
        const newState = profile(undefined, {
            type: PROFILE_ERROR,
            payload
        });
        const expectedState = { profile: null, profiles: [], repos: [], error: payload, loading: false };

        expect(newState).toEqual(expectedState);
    });

    test('Should return cleared state if receiving type CLEAR_PROFILE', () => {
        const oldState = { profile: {user_id: 1, id: 1, name: 'test'}, loading: true, repos: [{id: 1, name: 'Test1'}, {id: 1, name: 'Test1'}]};
        const newState = profile(oldState, {
            type: CLEAR_PROFILE
        });
        const expectedState = { profile: null, repos: [], loading: false };

        expect(newState).toEqual(expectedState);
    });
});