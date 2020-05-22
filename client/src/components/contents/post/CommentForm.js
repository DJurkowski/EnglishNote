import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/post';
import styles from './CommentForm.module.scss';

const CommentFrom = ({ postId, addComment }) => {

    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
    };

    const onChange = e => {
        setText(e.target.value);
    };

    return (
        <>
            <form className={styles.form} onSubmit={e => onSubmit(e)}>
                    <div className={styles.form_group}>
                        <textarea 
                            className={styles.input}
                            col='30'
                            row='5'
                            placeholder='*Write comment...'
                            name='text'
                            value={text}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                <button type='submit' className={styles.submit}>comment</button> 
            </form>
        </>
    );
};

CommentFrom.propTypes = {
    addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentFrom);