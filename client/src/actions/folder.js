import axios from 'axios';
import { setAlert } from './alert';

import { ADD_FOLDER, FOLDER_ERROR } from './types';

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
}