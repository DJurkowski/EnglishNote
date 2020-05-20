import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFolderById, editFolder } from '../../../actions/folder';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import styles from './EditFolder.module.scss';
import Spinner from '../spinner/Spinner';


const EditFolder = ({ getFolderById, editFolder, folder: { folder, loading}, history, match }) => {

    const [ oldWords, setOldWords ] = useState([{_id: '',
    polishword: '',
    englishword: '',
    synonyms: []}]);
    const [ folderName, setFolderName ] = useState('');

    useEffect(() => {
        getFolderById(match.params.id);

        setFolderName(loading || !folder.name ? '' : folder.name);

        setOldWords( loading || !folder.words ? [{_id: '',
            polishword: '',
            englishword: '',
            synonyms: []}] : folder.words
        );
    }, [getFolderById, match.params.id, loading, folder]);


    const handleDeleteOriginalWord = (id) => {
        setOldWords((word) => word.filter(x => x._id !== id));
    };

    const handleOnChangeOldWord = (e, id) => {
        const event = e.target;
        setOldWords((word) => word.map(x => x._id === id ? {
            ...x,
            [event.name]: event.value
        }: x));
    };

    const handleOnChangeSynonyms = (e, id) => {
        
        const array = e.target.value.split(',').map(word => word.trim());
        console.log(array);
        setOldWords((word) => word.map(x => x._id === id ? {
            ...x,
            synonyms:  array
        }: x));
    };

    const [ newWords, setNewWords ] = useState([{
        id: 0,
        polishword: '',
        englishword: '',
        synonyms: ''
    }]);

    const handleOnChangeWord = (e, id) => {
        const event = e.target;
        setNewWords((currentWords) => currentWords.map(x => x.id === id ? {
            ...x,
            [event.name]: event.value
        }: x));
    };

    const handleDeleteWord = (id) => {
        setNewWords((currentWords) => currentWords.filter(x => x.id !== id));
    };

    const addNewWordFn = () => {
       
        setNewWords(currentWords => [
            ...currentWords, 
            {
                id: generate(),
                polishword: '',
                englishword: '',
                synonyms: ''
            }
        ]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const addNewWords = { words: null };
        addNewWords.words = newWords.map(({id, ...items}) => items);
        const formData = {name: folderName, words: oldWords};
        editFolder(match.params.id, formData , addNewWords, history);
    };


    return loading || folder === null ? (<Spinner />): (
        <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.form_header}>
                        <h1 className={styles.form_header_title}>Folder</h1>
                        <p><i className="fas fa-folder"></i> Edit Your Folder</p>
                        <small>* = required field</small>
                    </div>
                    <form className={styles.form} onSubmit={e => onSubmit(e)}> 
                        <div className={styles.form_group}>
                            <div 
                                className={styles.form_group_item}
                            >{folderName}</div>
                        </div>
                        {newWords.map(word => {
                            return (
                                    <div key={word.id} className={styles.form_group_item}>
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
                                        <small className={styles.form_group_item_small}>separate synonyms with '/' e.g word#1 / word#2</small>
                                    </div>
                            );
                        })}
                        <div className={styles.form_group}>
                            <input type='button' onClick={addNewWordFn} className={styles.submit} value='add new word' />
                        </div>
                        {folder && oldWords.map(word => {
                            return (
                                    <div key={word._id} className={styles.form_group_item}>
                                        <div
                                            className={styles.form_group_item_delete}
                                            onClick={() => handleDeleteOriginalWord(word._id)}
                                        >
                                            <i className="fas fa-trash-alt fa-2x"></i>
                                        </div>
                                        <input 
                                            className={styles.form_group_item_input}
                                            type='text'
                                            placeholder='*english word'
                                            name='englishword'
                                            value={word.englishword}
                                            onChange={e => handleOnChangeOldWord(e, word._id)}
                                            required
                                        />
                                        <input 
                                            className={styles.form_group_item_input}
                                            type='text'
                                            placeholder='*native word'
                                            name='polishword'
                                            value={word.polishword}
                                            onChange={e => handleOnChangeOldWord(e, word._id)}
                                            required
                                        /> 
                                        <input 
                                            className={styles.form_group_item_input}
                                            type='text'
                                            placeholder='synonyms'
                                            name='synonyms'
                                            value={word.synonyms.toString()}
                                            onChange={e => handleOnChangeSynonyms(e, word._id)}
                                        />
                                        <small className={styles.form_group_item_small}>separate synonyms with ',' e.g word#1 , word#2</small>
                                        
                                    </div>
                            );
                        })}

                        <input type='submit' className={styles.submit} value='save' />
                        <Link className={styles.submit} to='/myfolders'>back</Link>
                    </form>
                </div>
        </div>
    );
};

EditFolder.propType = {
    getFolderById: PropTypes.func.isRequired,
    editFolder: PropTypes.func.isRequired,
    folder: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    folder: state.folder
});


export default connect(mapStateToProps, { getFolderById, editFolder })(withRouter(EditFolder));