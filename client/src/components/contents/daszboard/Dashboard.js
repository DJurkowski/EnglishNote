import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../spinner/Spinner';
import { getCurrentProfile } from '../../../actions/profile';
import styles from './Dashboard.module.scss';

const Dashboard = ({ getCurrentProfile, auth: {user}, profile: {profile, loading} }) => {

    useEffect(() => {
        getCurrentProfile();
    // eslint-disable-next-line 
    }, []);

    const content = (
        (profile && user) ?
        (<div className={styles.content}>
            <div className={styles.box}>
                <figure className={styles.img}>
                    <img src={user.avatar} alt="Profile"/>
                </figure>
                <h2>Username: { user.name }</h2>
                <p>{profile.status && ("Status: " + profile.status)}</p>
                <p>{profile.location && ("Location: " + profile.location)}</p>
                {/* <p>{profile.date && ("Join date: " + profile.date.split('T')[0])}</p> */}
                <p>Join date: <Moment format='DD/MM/YYYY'>{profile.date}</Moment></p>
                <Link className={styles.button} to='/edit-profile'>edit</Link>
            </div>
            <div className={styles.box}><i className="fab fa-github"></i> {profile.githubusername}</div>
            <div className={styles.box}><i className="fas fa-globe"></i><a href={user.website} rel="noopener noreferrer" target="_blank"> website</a></div>

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
        ) : (
            <div className={styles.info}>
                <p>You have not yet setup a profile, please add some info</p>
                <Link style={{color: '#FF6F91',textDecoration: 'none'}} to='/create-profile'>Create profile</Link>

            </div>
        )
    );

    return (
        <div className={styles.wrapper}>
           {loading && profile === null ? (<Spinner />) : (content)} 
        </div>
    );

};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
