import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../../actions/profile';
import Moment from 'react-moment';
import Spinner from '../spinner/Spinner';
import styles from './Profile.module.scss';


const Profile = ({ getProfileById, profile: {profile, loading}, match}) => {

    useEffect(() => {
        getProfileById(match.params.id);
    }, [loading]);

    const website = 'www.google.com';

    const content = (
        profile &&
        (<div className={styles.content}>
            <div className={styles.box}>
                <figure className={styles.img}>
                    <img src={profile.user.avatar} alt="Profile"/>
                </figure>
                <h2>Username: { profile.user.name }</h2>
                <p>{profile.status && ("Status: " + profile.status)}</p>
                <p>{profile.location && ("Location: " + profile.location)}</p>
                {/* <p>{profile.date && ("Join date: " + profile.date.split('T')[0])}</p> */}
                <p>Join date: <Moment format='DD/MM/YYYY'>{profile.date}</Moment></p>
            </div>
            <div className={styles.box}><i className="fab fa-github"></i> {profile.githubusername}</div>
            <div className={styles.box}><i className="fas fa-globe"></i> {profile.website}</div>

            {(profile.social.linkedin !== '' ? 
                <div className={styles.box}><i className="fab fa-linkedin-in"></i> {profile.social.linkedin}</div> 
                // eslint-disable-next-line
                : <div className={styles.box, styles.hide}></div>
            )}
            {((profile.social.youtube !== '')  ? 
                <div className={styles.box}><i className="fab fa-youtube"></i> {profile.social.youtube}</div> 
                // eslint-disable-next-line
                : <div className={styles.box, styles.hide}></div>
            )}
            {(( profile.social.twitter !== '')? 
                <div className={styles.box}><i className="fab fa-twitter"></i> {profile.social.twitter}</div> 
                // eslint-disable-next-line
                : <div className={styles.box, styles.hide}></div>
            )}
            {((profile.social.instagram !== '') ? 
                <div className={styles.box}><i className="fab fa-instagram"></i> {profile.social.instagram}</div> 
                // eslint-disable-next-line
                : <div className={styles.box, styles.hide}></div>
            )}
            {((profile.social.facebook !== '')? 
                <div className={styles.box}><i className="fab fa-facebook"></i> {profile.social.facebook}</div> 
                // eslint-disable-next-line
                : <div className={styles.box, styles.hide}></div>
            )}
            
            <div className={styles.box}>Bio: {profile.bio}</div>
        </div>
        )
    );


    return (
        <div className={styles.wrapper}>
            {loading && profile === null ? (<Spinner />) : (content)} 
        </div>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(Profile);

