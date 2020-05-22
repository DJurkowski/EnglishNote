import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import styles from './PostForm.module.scss';

const PostForm = ({ addPost }) => {

    const [text, setText ] = useState('');

    const onChange = e => {
        setText(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        addPost({ text });
        setText('');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.form_header}>
                    <h1 className={styles.form_header_title}>Post</h1>
                    <p style={{margin: '5px'}}><i className="fas fa-comments"></i> Create Post </p>
                    <small>* = required field</small>
                </div>
                <form className={styles.form} onSubmit={e => onSubmit(e)}>
                        <div className={styles.form_group}>
                            <textarea 
                                className={styles.input}
                                col='30'
                                row='5'
                                placeholder='*Say something...'
                                name='text'
                                value={text}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                    <button type='submit' className={styles.submit}>post</button> 
                </form>
            </div>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);

