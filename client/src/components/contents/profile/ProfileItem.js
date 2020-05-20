import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileItem.module.scss';

const ProfileItem = ({  profile: { 
    user: { _id, name, avatar },
    status,
    location,
    skills
    } 
}) => {

    return (
        <div className={styles.box}>
            <p><strong>Status: </strong>{status}</p>
            <p><strong>Location: </strong>{location}</p>
            <p><strong>Skills: </strong>{skills.toString()}</p>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;