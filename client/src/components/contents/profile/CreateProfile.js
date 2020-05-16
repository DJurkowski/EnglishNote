import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../../actions/profile';
import styles from './CreateProfile.module.scss';

const CreateProfile = ({ createProfile, history }) => {

    const [formData, setFormData] = useState({
        website: '',
        location: '',
        status: '',        
        skills: '',
        bio: '',
        githubusername: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagra: ''
    });

    const [displaySocialInputs, setSocialInputs] = useState(false);

    const {
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = formData;

    const handleSocialMediaButton = () => setSocialInputs(!displaySocialInputs);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.form_header}>
                    <h1 className={styles.form_header_title}>Profile</h1>
                    <p><i className="fas fa-user fa-lg"/> Create Your Profile</p>
                    <small>* = required field</small>
                </div>
                <form className={styles.form} onSubmit={e => onSubmit(e)}> 
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='website'
                            name='website'
                            value={website}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='location'
                            name='location'
                            value={location}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <select 
                            name='status'
                            value={status}
                            onChange={e => onChange(e)}
                            className={styles.input}
                        >
                            <option className={styles.option} value="0">*Select Professional Status</option>
                            <option className={styles.option} value="Developer">Developer</option>
                            <option className={styles.option} value="Junior Developer">Junior Developer</option>
                            <option className={styles.option} value="Senior Developer">Senior Developer</option>
                            <option className={styles.option} value="Manager">Manager</option>
                            <option className={styles.option} value="Student or Learnining">Student or Learnining</option>
                            <option className={styles.option} value="Instructor">Instructor</option>
                            <option className={styles.option} value="Intern">Intern</option>
                            <option className={styles.option} value="Other">Other</option>
                        </select>
                        <small>Give us an idea of where you are at in your career</small>
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='*Skills'
                            name='skills'
                            value={skills}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='Github Username'
                            name='githubusername'
                            value={githubusername}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <textarea
                            className={styles.input}
                            placeholder='A short bio of yourself'
                            name='bio'
                            value={bio}
                            onChange={e => onChange(e)}
                            />
                    </div>
                    <div className={styles.form_group}>
                        <button type="button" className={styles.submit} onClick={handleSocialMediaButton}>add social media links</button>
                    </div>

                    {displaySocialInputs &&
                    <>
                        <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='Youtube url'
                            name='youtube'
                            value={youtube}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='twitter url'
                            name='twitter'
                            value={twitter}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='facebook url'
                            name='facebook'
                            value={facebook}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='linkedin url'
                            name='linkedin'
                            value={linkedin}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='instagram url'
                            name='instagram'
                            value={instagram}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    </>
                    }
                    <input type='submit' className={styles.submit} value='save' />
                </form>
                <p className={styles.form_footer}>
                    {/* Already have an account? <Link style={{color: '#FF6F91'}} to='/login'>Sing In</Link> */}
                </p>
            </div>
        </div>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};



export default connect(null, { createProfile })(withRouter(CreateProfile));