import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { getProfiles } from '../../../actions/profile';
import styles from './Profiles.module.scss';

const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {

    useEffect(()=> {
        getProfiles();
    }, [getProfiles, loading]);

    return loading || !profiles ? (<Spinner />) : (
        <div className={styles.wrapper}>
            <div className={styles.content}>
               {profiles.length > 0 ?  
                (profiles.map(profile => (
                    
                    <div key={profile._id} className={styles.box}>
                        <figure className={styles.img}>
                            <img src={profile.user.avatar} alt="Profile"/>
                        </figure>   
                        <div className={styles.content_item}><h2>Name: {profile.user.name}</h2></div>
                        <div className={styles.content_item}><p>{profile.location && ("Location: " + profile.location)}</p></div>
                        <div className={styles.content_item}>
                            <Link className={styles.button} to={`/profile/${profile.user._id}`}>Show more</Link>
                        </div>
                        
                    </div>
                ))
                ):(<h4>No profiles found...</h4>)}
            </div>
        </div>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);