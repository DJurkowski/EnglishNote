import React from 'react';
import styles from './Brand.module.scss';

const Brand = () => (
    <>
        <h2 className={styles.logo} data-test='logo'>English Note</h2>
        <h2 className={styles.minlogo} data-test='miniLogo'>E N</h2>
    </>
);

export default Brand;

