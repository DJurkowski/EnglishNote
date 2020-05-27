import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Login.module.scss';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password} = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.form_header}>
                    <h1 className={styles.form_header_title}>Sign Up</h1>
                    <p><i className="fas fa-user fa-lg"/> Sign Into Your Account</p>
                </div>
                <form className={styles.form} onSubmit={e => onSubmit(e)}> 
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
                    <input type='submit' className={styles.submit} value='login' />
                </form>
                <p className={styles.form_footer}>
                    Don't have an account? <Link style={{color: '#FF6F91'}} to='/register'>Sing Up</Link>
                </p>
            </div>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);