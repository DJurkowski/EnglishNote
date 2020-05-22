import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import styles from './PostItem.module.scss';
import { addLike, removeLike, deletePost } from '../../../actions/post'; 

const PostItem = ({ addLike, removeLike, deletePost, auth , post, showAction}) => {

    return (
        <div className={styles.box}>
            <div className={styles.box_item}>
                <Link to={`/profile/${post.user}`}><img className={styles.box_item_img} src={post.avatar} alt='Avatar'/></Link>
                <h2>{post.name}</h2>
            </div>
            <div className={styles.box_item}>
                <div className={styles.box_item_date}>
                    <Moment format='DD MMM YYYY'>{post.date}</Moment>
                </div>
                <div className={styles.box_item_text}>
                    <p>{post.text}</p>
                </div>

                {showAction && (
                    <>
                    <div className={styles.box_item_likes}>
                        <button onClick={e => addLike(post._id)} className={styles.box_item_likes_button}>
                            <i className="fas fa-thumbs-up fa-lg"></i>
                            {post.likes.length > 0 && (<span className={styles.button_badge}>{post.likes.length}</span>)}
                        </button>
                        <button onClick={e => removeLike(post._id)} className={styles.box_item_likes_button}><i className="fas fa-thumbs-down fa-lg"></i></button>
                    </div>
                    <div className={styles.box_item_links}>
                        <Link className={styles.box_item_links_comments_button} to={`/post/${post._id}`}>
                            Comment
                            {(post.comments.length > 0) && 
                                <span className={styles.button_badge}>{post.comments.length}</span>
                            }
                        </Link>
                        {!auth.loading && post.user === auth.user._id && 
                            <button onClick={e => deletePost(post._id)} className={styles.box_item_links_delete}>Delete</button>
                        }
                    </div>
                    </>
                )}
                
            </div>
            
        </div>
    );
};

PostItem.defaultProps = {
    showAction: true
}

PostItem.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);

