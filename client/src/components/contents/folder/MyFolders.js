import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './AllFolders.module.scss';
import { getMyFolders } from '../../../actions/folder';
import Spinner from '../spinner/Spinner';

const MyFolders = ({ getMyFolders, folder: {folder, loading} }) => {

    useEffect(()=> {
        getMyFolders();
        // eslint-disable-next-line
    }, []);

    const folders_array = folder && folder.map(item => (
        item &&
        <div key={item._id} className={styles.box}>
            <div className={styles.content_item}><h2>Name: {item.name}</h2></div>
            <div className={styles.content_item}><p >words number: {item.words.length}</p></div>
            <div className={styles.content_item}><Link className={styles.button} to={`/folder/${item._id}`}>View more</Link></div>
        </div>
    ));

    return (

        <div className={styles.wrapper}>
            <div className={styles.content}>
                {loading && folder === null ? (<Spinner />): (folders_array)}
            </div>
        </div>
    );
};

MyFolders.propTypes = {
    getMyFolders: PropTypes.func.isRequired,
    folder: PropTypes.object.isRequired 
};

const mapStateToProps = state => ({
    folder: state.folder
});


export default connect(mapStateToProps, { getMyFolders })(MyFolders);