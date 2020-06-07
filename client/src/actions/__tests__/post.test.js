import moxios from 'moxios';
import { testStore } from '../../utils/testFunctions';
import { getPosts, getPost } from '../post';

describe('Post action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.install();
    });

    test('Should return posts', () => {

        const expectedState = [
            {
                id: 1,
                user: 1,
                text: 'This is a test post #1',
                name: 'Post #1',
                avatar: 'user 1 avatar',
                likes: [
                    {
                        user: 2
                    }
                ],
                date: '2020/07/06',
                comments: [
                    {
                        user: 2,
                        text: 'This is a test comment for post #1',
                        name: 'Commnet #1',
                        avatar: 'user 2 avatar',
                        date: '2020/07/06'
                    }
                ]
            },
            {
                id: 2,
                user: 2,
                text: 'This is a test post #2',
                name: 'Post #2',
                avatar: 'user 2 avatar',
                likes: [
                    {
                        user: 1
                    }
                ],
                date: '2020/06/01',
                comments: [
                    {
                        user: 1,
                        text: 'This is a test comment for post #2',
                        name: 'Commnet #1',
                        avatar: 'user 1 avatar',
                        date: '2020/06/01'
                    },
                    {
                        user: 3,
                        text: 'This is a test comment for post #2',
                        name: 'Commnet #2',
                        avatar: 'user 3 avatar',
                        date: '2020/06/02'
                    }
                ]
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

        return store.dispatch(getPosts())
        .then(() => {
            const newState = store.getState();
            expect(newState.post.posts).toBe(expectedState);
        });
    });

    test('Should return post by passing post id', () => {

        const expectedState =
            {
                id: 1,
                user: 1,
                text: 'This is a test post #1',
                name: 'Post #1',
                avatar: 'user 1 avatar',
                likes: [
                    {
                        user: 2
                    }
                ],
                date: '2020/07/06',
                comments: [
                    {
                        user: 2,
                        text: 'This is a test comment for post #1',
                        name: 'Commnet #1',
                        avatar: 'user 2 avatar',
                        date: '2020/07/06'
                    }
                ]
            };

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            });
        });

        return store.dispatch(getPost(1))
        .then(() => {
            const newState = store.getState();
            expect(newState.post.post).toBe(expectedState);
        });
    });
});