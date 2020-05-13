import React from 'react';
import styles from './Burgermenu.module.scss';
import cx from 'classnames';

const Burgermenu = (props) => (
    <div className={styles.wrapper} onClick={props.handleNavbar}>
        <div className={cx(props.navbarState ? styles.open : "")}>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
        </div>
    </div>
);

export default Burgermenu;