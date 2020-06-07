import moxios from 'moxios';
import { testStore } from '../../utils/testFunctions';
import { addFolder, getFolders, getFolderById } from '../folder';

describe('Folder action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.install();
    });

    test('Should return folders', () => {

        const expectedState = [
            {
                profile: 1,
                name: 'Folder #1',
                words: [
                    {
                        polishword: 'polish_word#1',
                        englishword: 'english_word#1',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#2',
                        englishword: 'english_word#2',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#3',
                        englishword: 'english_word#3',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#4',
                        englishword: 'english_word#4',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    }
                ]
            },
            {
                profile: 1,
                name: 'Folder #2',
                words: [
                    {
                        polishword: 'polish_word#1',
                        englishword: 'english_word#1',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#2',
                        englishword: 'english_word#2',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#3',
                        englishword: 'english_word#3',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#4',
                        englishword: 'english_word#4',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    }
                ]
            },
            {
                profile: 1,
                name: 'Folder #3',
                words: [
                    {
                        polishword: 'polish_word#1',
                        englishword: 'english_word#1',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#2',
                        englishword: 'english_word#2',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#3',
                        englishword: 'english_word#3',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                    },
                    {
                        polishword: 'polish_word#4',
                        englishword: 'english_word#4',
                        synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
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

        return store.dispatch(getFolders())
        .then(() => {
            const newState = store.getState();
            expect(newState.folder.folder).toBe(expectedState);
        });
    });

    test('Should return folder by passing folder id', () => {
        const expectedState = {
            profile: 1,
            name: 'Folder #1',
            words: [
                {
                    polishword: 'polish_word#1',
                    englishword: 'english_word#1',
                    synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                },
                {
                    polishword: 'polish_word#2',
                    englishword: 'english_word#2',
                    synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                },
                {
                    polishword: 'polish_word#3',
                    englishword: 'english_word#3',
                    synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                },
                {
                    polishword: 'polish_word#4',
                    englishword: 'english_word#4',
                    synonyms: ['synonym#1', 'synonym#2', 'synonym#3']
                }
            ]
        };

        const store = testStore();

        moxios.wait(()=> {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
        });

        return store.dispatch(getFolderById(1))
        .then(()=> {
            const newState = store.getState();
            expect(newState.folder.folder).toBe(expectedState);
        });
    });

});