import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import PostItem from './PostItem';
import { getPost } from '../../../actions/post';
import styles from './Posts.module.scss';
import { Link } from 'react-router-dom';


const Post = ({ getPost, post: { post, loading }, match }) => {

    useEffect(()=> {
        getPost(match.params.id);
    }, [getPost]);

    return loading || post === null ? <Spinner /> : (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Link to='/posts' className={styles.button}>Back</Link>
                <PostItem post={post} showAction={false} />
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
