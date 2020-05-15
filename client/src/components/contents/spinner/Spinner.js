import React from 'react';
import styles from './Spinner.module.scss';
import spinner from './spinner.gif';

export default () => (
    <div className={styles.container}>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </div>
);