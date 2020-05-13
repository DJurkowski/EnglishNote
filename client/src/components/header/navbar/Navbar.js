import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Navbar.module.scss';
import Brand from '../brand/Brand';
import Burgermenu from '../burgermenu/Burgermenu';
import CollapseMenu from '../collapsemenu/Collapsemenu';

const Navbar = (props) => (
    <>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link className={styles.minlogo} to='/'><Brand /></Link>
                <ul className={styles.navLinkStart}>
                    <Link className={styles.logo} to='/'><Brand /></Link>
                    <div style={{marginLeft: 30 + 'px'}} className={styles.navbarItem}>about</div>
                    <div style={{marginLeft: 30 + 'px'}} className={styles.navbarItem}>folder</div>
                </ul>
                <ul className={styles.navLinkEnd}>
                    <Link className={styles.navbarItem} to='/login'>login</Link>
                    <Link className={styles.special} to='/register'>register</Link>
                </ul>
                <div className={styles.burgerWrapper}>
                    <Burgermenu 
                        navbarState = {props.navbarState}
                        handleNavbar = {props.handleNavbar}
                    />
                </div>
            </div>

        </nav>
        <CollapseMenu 
            navbarState = {props.navbarState}
            handleNavbar = {props.handleNavbar}
        />
    </>
);

export default Navbar;