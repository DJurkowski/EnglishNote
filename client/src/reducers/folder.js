import { ADD_FOLDER, FOLDER_ERROR } from "../actions/types";

const initialState = {
    folder: null,
    folders: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case ADD_FOLDER:
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