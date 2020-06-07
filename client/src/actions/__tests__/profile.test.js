import moxios from 'moxios';
import { testStore } from '../../utils/testFunctions';
import { getProfiles, getProfileById } from '../profile';

describe('Profile action', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.install();
    });

    test('Should return profiles', () => {

        const expectedState = [
            {
                id: 1,
                user: 1,
                website: 'www.testuser.pl',
                location: 'test',
                status: 'test',
                skills: ['test#1', 'test#2', 'test#3'],
                bio: 'Test user information',
                githubusername: 'test',
                folders: [],
                social: {
                    youtube: 'test',
                    twitter: 'test',
                    facebook: 'test',
                    linkedin: 'test',
                    instagram: 'test'
                },
                date: '2020/06/07'
            },
            {
                id: 2,
                user: 2,
                website: 'www.usersecond.pl',
                location: 'test#2',
                status: 'test#2',
                skills: ['test#4', 'test#5', 'test#6'],
                bio: 'Second test user information',
                githubusername: 'secondTest',
                folders: [],
                social: {
                    youtube: 'secondTest',
                    twitter: 'secondTest',
                    facebook: 'secondTest',
                    linkedin: 'secondTest',
                    instagram: 'secondTest'
                },
                date: '2020/05/02'
            }
        ];

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            });
        });

        return store.dispatch(getProfiles())
        .then(() => {
            const newState = store.getState();
            expect(newState.profile.profiles).toBe(expectedState);
        });
    });

    test('Should return profile by passing profile id', () => {
        const expectedState = {
            id: 1,
            user: 1,
            website: 'www.testuser.pl',
            location: 'test',
            status: 'test',
            skills: ['test#1', 'test#2', 'test#3'],
            bio: 'Test user information',
            githubusername: 'test',
            folders: [],
            social: {
                youtube: 'test',
                twitter: 'test',
                facebook: 'test',
                linkedin: 'test',
                instagram: 'test'
            },
            date: '2020/06/07'
        };

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            });
        });

        return store.dispatch(getProfileById(1))
        .then(() => {
            const newState = store.getState();
            expect(newState.profile.profile).toBe(expectedState);
        });
    });

});