import { ADD_FOLDER, FOLDER_ERROR, GET_ALL_FOLDERS, GET_MY_FOLDERS, 
    DELETE_FOLDER, GET_FOLDER, EDIT_FOLDER } from "../../actions/types";

import folder from '../folder';

describe('Folder reducer', () => {

    test('Should return default state', () => {
        const newState = folder(undefined, {});

        const defaultState = {
            folder: null,
            folders: [],
            loading: true,
            error: {}
        };

        expect(newState).toEqual(defaultState);
    });

    test('Should return error payload if receiving type FOLDER_ERROR', () => {
        const payload = { msg: 'Error', status: '500'};
        const newState = folder(undefined, {
            type: FOLDER_ERROR,
            payload
        });
        const expectedState = { folder: null, folders: [], error: payload, loading: false };

        expect(newState).toEqual(expectedState);
    });
});