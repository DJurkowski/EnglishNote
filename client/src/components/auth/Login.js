import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './Login.module.scss';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password} = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('SUCCESS');
    };

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

export default Login;