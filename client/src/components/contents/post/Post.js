import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import PostItem from './PostItem';
import { getPost } from '../../../actions/post';
import styles from './Posts.module.scss';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';


const Post = ({ getPost, post: { post, loading }, match }) => {

    useEffect(()=> {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    return loading || post === null ? <Spinner /> : (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Link to='/posts' className={styles.button}>Back</Link>
                <PostItem post={post} showAction={false} />
                <CommentForm postId={post._id}/>
                {post.comments.length > 0 && (
                    <div className={styles.box}>
                        {post.comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} postId={post._id} />
                        ))}
                    </div>
                )}
                
            </div>
        </div>
    )
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
