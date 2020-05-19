import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './MyFolders.module.scss';
import { getMyFolders } from '../../../actions/folder';
import { deleteFolder } from '../../../actions/folder';
import Spinner from '../spinner/Spinner';

const MyFolders = ({ getMyFolders, deleteFolder, folder: {folder, loading} }) => {

    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(()=> {
        getMyFolders();
    }, [getMyFolders, refreshKey]);

    const handleDeleteButton = (id) => {
        deleteFolder(id)
        .then((profile) => {
            setRefreshKey(oldKey => oldKey + 1 );
        });
    };

    const folders_array = folder && folder.length > 0 && folder.map(item => (
        item &&
        <div key={item._id} className={styles.box}>
            <div className={styles.content_item_delete} onClick={() => handleDeleteButton(item._id)}><i className="fas fa-trash-alt fa-2x"></i></div>
            <div className={styles.content_item}><h2>Name: {item.name}</h2></div>
            <div className={styles.content_item}><p >words number: {item.words.length}</p></div>
            <div className={styles.content_item}><Link className={styles.button} to={`/folder/${item._id}`}>View more</Link></div>
        </div>
    ));

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {loading || folder === null ? (<Spinner />): (folders_array)}
            </div>
        </div>
    );
};

MyFolders.propTypes = {
    getMyFolders: PropTypes.func.isRequired,
    deleteFolder: PropTypes.func.isRequired,
    folder: PropTypes.object.isRequired 
};

const mapStateToProps = state => ({
    folder: state.folder
});


export default connect(mapStateToProps, { getMyFolders, deleteFolder })(MyFolders);