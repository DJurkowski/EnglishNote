import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFolderById } from '../../../actions/folder';
import styles from './Folder.module.scss';
import Spinner from '../spinner/Spinner';
import FlashCard from '../flashcard/FlashCard';


const Folder = ({ getFolderById, folder: {folder, loading}, match }) => {

    useEffect(()=> {
        getFolderById(match.params.id);
    }, [getFolderById, match.params.id, loading]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {loading || folder === null || !folder.words ? (<Spinner />): (
                    folder.words.length > 0  ?
                    <>
                        <div className={styles.content_header}>
                            <h2>Folder: {folder.name}</h2>
                            <small>To see translation tap the card</small>
                        </div>
                            {folder.words.map( word => <FlashCard word={word} key={word._id} />)}
                    </>
                    :
                    <div className={styles.content}>
                        <div>There is not words in this folder. Please go and add some</div>
                    </div>
                )}
            </div>
        </div>
    );
};

Folder.propTypes = {
    getFolderById: PropTypes.func.isRequired,
    folder: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    folder: state.folder
});

export default connect(mapStateToProps, { getFolderById })(Folder);