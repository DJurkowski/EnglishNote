import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.box}>
                    <h1><i class="fas fa-exclamation-circle"></i> Page Not Found</h1>
                    <p>Sorry for the issues</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;