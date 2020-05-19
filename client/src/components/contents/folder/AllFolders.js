import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './AllFolders.module.scss';
import { getFolders } from '../../../actions/folder';
import Spinner from '../spinner/Spinner';

const AllFolders = ({ getFolders, folder: {folder, loading} }) => {

    useEffect(()=> {
        getFolders();
    }, [getFolders]);

    const folders_array = folder && folder.map(item => (
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

AllFolders.propTypes = {
    getFolders: PropTypes.func.isRequired,
    folder: PropTypes.object.isRequired 
};

const mapStateToProps = state => ({
    folder: state.folder
});


export default connect(mapStateToProps, { getFolders })(AllFolders);