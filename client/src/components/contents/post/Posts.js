import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../../actions/post';
import styles from './Posts.module.scss';

const Posts = ({ getPosts, post: { posts, loading }}) => {

    useEffect(()=> {
        getPosts();
    }, [getPosts]);

    return loading ? <Spinner /> : (
        <div className={styles.wrapper}>
            <div className={styles.content}>
            <div className={styles.content_header}>
                <h2>Posts</h2>
                <p>Welcome to the community</p>
            </div>
                {posts.map(post => (
                    // post.name
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);