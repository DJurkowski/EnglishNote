import axios from 'axios';
import { setAlert } from './alert';

import { ADD_FOLDER, FOLDER_ERROR, GET_ALL_FOLDERS, GET_MY_FOLDERS, 
    DELETE_FOLDER, GET_FOLDER, EDIT_FOLDER } from './types';

// Add folder
export const addFolder = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/folder', formData, config)

        dispatch({
            type: ADD_FOLDER,
            payload: res.data
        });

        dispatch(setAlert('Folder added', 'success'))
        history.push('/myfolders');

    } catch (err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FOLDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all folders
export const getFolders = () => async dispatch => {
    try {
    
        const res = await axios.get('/api/folder');

        dispatch({
            type: GET_ALL_FOLDERS,
            payload: res.data
        });
        
    } catch (err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FOLDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get my folders
export const getMyFolders = () => async dispatch => {
    try {
    
        const res = await axios.get('/api/folder/my');

        dispatch({
            type: GET_MY_FOLDERS,
            payload: res.data
        });
        
    } catch (err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FOLDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get folder by ID
export const getFolderById = folderId => async dispatch => {
    try {
        const res = await axios.get(`/api/folder/${folderId}`);

        dispatch({
            type: GET_FOLDER,
            payload: res.data
        });

    } catch (err) {
        
        dispatch({
            type: FOLDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }

};

// Delete folder
export const deleteFolder = id => async dispatch => {

    if(window.confirm('Are you sure, you want to delete this folder?')) {
        try {
            const res = await axios.delete(`/api/folder/${id}`);
    
            dispatch({
                type: DELETE_FOLDER,
                payload: res.data
            });
    
            dispatch(setAlert('Folder removed', 'success'));
    
        } catch (err) {
            dispatch({
                type: FOLDER_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
            
        }
    }
};
// Edit folder
export const editFolder = (id ,formData, words, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios.put(`/api/folder/${id}`, formData, config)
        const res = await axios.put(`/api/folder/${id}/words`, words, config);


        dispatch({
            type: EDIT_FOLDER,
            payload: res.data
        });

        dispatch(setAlert('Folder edited', 'success'))
        history.push('/myfolders');

    } catch (err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FOLDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};