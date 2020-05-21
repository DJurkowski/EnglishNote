import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import styles from './PostItem.module.scss';


const PostItem = ({auth: {user : {_id}} ,post}) => {

    return (
        <div className={styles.box}>
            <div className={styles.box_item}>
                <img className={styles.box_item_img} src={post.avatar} alt='Avatar'/>
                <h2>{post.name}</h2>
            </div>
            <div className={styles.box_item}>
                <div className={styles.box_item_date}>
                    <Moment format='DD MMM YYYY'>{post.date}</Moment>
                </div>
                <div className={styles.box_item_text}>
                    <p>{post.text}</p>
                </div>
                <div className={styles.box_item_likes}>
                    {post.likes.length > 0 ? (
                        <button className={styles.box_item_likes_button}><i className="fas fa-thumbs-up fa-lg"></i><span className={styles.button_badge}>{post.likes}</span></button>
                        
                    ):(
                        <button className={styles.box_item_likes_button}><i className="fas fa-thumbs-up fa-lg"></i></button>
                    )}
                    <button className={styles.box_item_likes_button}><i className="fas fa-thumbs-down fa-lg"></i></button>

                </div>
                {console.log(post)}
                <div className={styles.box_item_links}>
                    <Link className={styles.box_item_links_comments_button} to={`/post/${post._id}`}>
                        Comment
                        {(post.comments.length > 0) && 
                            <span className={styles.button_badge}>{post.comments.length}</span>
                        }
                    </Link>
                    {post.user === _id && 
                        <button className={styles.box_item_links_delete}>Delete</button>
                    }
                </div>
            </div>
            
        </div>
    );
};


PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(PostItem);

