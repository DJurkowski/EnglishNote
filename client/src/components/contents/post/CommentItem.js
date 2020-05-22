import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './CommentItem.module.scss';
import Moment from 'react-moment';
import { deleteComment } from '../../../actions/post';

const CommentItem = ({ postId, auth, comment, deleteComment }) => {

    return (
        <div key={comment._id} className={styles.box}>
            <h3 className={styles.header}>Comments</h3>
            <div className={styles.box_item}>
                <div className={styles.box_item_avatar}>
                    <Link to={`/profile/${comment.user}`}><img className={styles.avatar_img} src={comment.avatar} alt='Avatar' /></Link>
                    <span className={styles.name} >{comment.name}</span>
                </div>
                <div className={styles.box_item_delete}>
                    <Moment style={{marginRight: '10px'}} format='DD MMM YYYY'>{comment.date}</Moment>
                    {!auth.loading && auth.user._id === comment.user && (
                        <button onClick={() => deleteComment(postId, comment._id)} className={styles.box_item_delete_button}>
                            <i className="fas fa-trash-alt fa-lg"></i>
                        </button>
                    )}
                </div>

                <textarea 
                    className={styles.box_item_textarea}
                    value={comment.text}
                    col='30'
                    row='5'
                    placeholder='*Say something...'
                    name='text'
                    readOnly
                    required
                />
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);