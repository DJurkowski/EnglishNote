import { ADD_FOLDER, FOLDER_ERROR, GET_ALL_FOLDERS, GET_MY_FOLDERS, DELETE_FOLDER } from "../actions/types";

const initialState = {
    folder: null,
    folders: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_ALL_FOLDERS:
        case GET_MY_FOLDERS:
            return {
                ...state,
                folder: payload,
                loading: false
            };
        case ADD_FOLDER:
        case DELETE_FOLDER:
            return {
                ...state,
                ...payload,
                loading: false
            };
        case FOLDER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    };
};