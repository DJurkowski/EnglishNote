import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import styles from './Register.module.scss';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Password do not match', 'danger', 3000);
        }else {
            register({ name, email, password });
        }
    };

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.form_header}>
                    <h1 className={styles.form_header_title}>Sign Up</h1>
                    <p><i className="fas fa-user fa-lg"/> Create Your Account</p>
                </div>
                <form className={styles.form} onSubmit={e => onSubmit(e)}> 
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='text'
                            placeholder='name'
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='email'
                            placeholder='email address'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input 
                            className={styles.input}
                            type='password'
                            placeholder='password'
                            name='password'
                            value={password}
                            minLength='6'
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <input
                            className={styles.input}
                            type='password'
                            placeholder='confirm password'
                            name='password2'
                            value={password2}
                            minLength='6'
                            onChange={e => onChange(e)}
                            required
                            />
                    </div>
                    <input type='submit' className={styles.submit} value='register' />
                </form>
                <p className={styles.form_footer}>
                    Already have an account? <Link style={{color: '#FF6F91'}} to='/login'>Sing In</Link>
                </p>
            </div>
        </div>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);