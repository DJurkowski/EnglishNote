import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFolder } from '../../../actions/folder';
import { generate } from 'shortid';
import styles from './CreateFolder.module.scss';

const CreateFolder = ({ addFolder, history }) => {

    const [ words, setWords ] = useState([{
        id: 0,
        polishword: '',
        englishword: '',
        synonyms: ''
    }]);

    const handleOnChangeWord = (e, id) => {
        const event = e.target;
        setWords((currentWords) => currentWords.map(x => x.id === id ? {
            ...x,
            [event.name]: event.value
        }: x));
    };

    const handleDeleteWord = (id) => {
        setWords((currentWords) => currentWords.filter(x => x.id !== id));
    }

    const addNewWordFn = () => {
       
        setWords(currentWords => [
            ...currentWords, 
            {
                id: generate(),
                polishword: '',
                englishword: '',
                synonyms: ''
            }
        ]);
    };

    const [ fromName, setFormName ] = useState('');
    
    const handleFormNameInput = (e) => setFormName( e.target.value );


    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = { name: '', words: null };
        formData.name = fromName
        formData.words = words.map(({id, ...items}) => items);
        console.log(formData);
        addFolder(formData, history);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.form_header}>
                    <h1 className={styles.form_header_title}>Folder</h1>
                    <p><i className="fas fa-folder"></i> Create Your Folder</p>
                    <small>* = required field</small>
                </div>
                <form className={styles.form} onSubmit={e => onSubmit(e)}> 
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='*folder name'
                            name='name'
                            value={fromName}
                            onChange={e => handleFormNameInput(e)}
                            required
                        />
                    </div>
                    {words.map(word => {
                        return (
                            <>
                                <div key={word._id} className={styles.form_group_item}>
                                    <div
                                        className={styles.form_group_item_delete}
                                        onClick={() => handleDeleteWord(word.id)}
                                    >
                                        <i className="fas fa-trash-alt fa-2x"></i>
                                    </div>
                                    <input 
                                        className={styles.form_group_item_input}
                                        type='text'
                                        placeholder='*english word'
                                        name='englishword'
                                        value={word.englishword}
                                        onChange={e => handleOnChangeWord(e, word.id)}
                                        required
                                    />
                                    <input 
                                        className={styles.form_group_item_input}
                                        type='text'
                                        placeholder='*native word'
                                        name='polishword'
                                        value={word.polishword}
                                        onChange={e => handleOnChangeWord(e, word.id)}
                                        required
                                    /> 
                                    <input 
                                        className={styles.form_group_item_input}
                                        type='text'
                                        placeholder='synonyms'
                                        name='synonyms'
                                        value={word.synonyms}
                                        onChange={e => handleOnChangeWord(e, word.id)}
                                    />
                                    <small className={styles.form_group_item_small}>separate synonyms with ',' e.g word#1 , word#2</small>
                                </div>
                            </>
                        );
                    })}
                    <div className={styles.form_group}>
                        <input type='button' onClick={addNewWordFn} className={styles.submit} value='add new word' />
                    </div>
                    <input type='submit' className={styles.submit} value='save' />
                    <Link className={styles.submit} to='/myfolders'>back</Link>
                </form>
            </div>
        </div>
    );
};

CreateFolder.propTypes = {
    addFolder: PropTypes.func.isRequired
};

export default connect(null, { addFolder })(withRouter(CreateFolder));