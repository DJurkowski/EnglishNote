import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.scss';
import Brand from '../brand/Brand';
import Burgermenu from '../burgermenu/Burgermenu';
import CollapseMenu from '../collapsemenu/Collapsemenu';

const Navbar = (props) => (
    <>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.minlogo}><Brand /></div>
                <ul className={styles.navLinkStart}>
                    <Brand />
                    <div style={{marginLeft: 30 + 'px'}} className={styles.navbarItem}>about</div>
                    <div style={{marginLeft: 30 + 'px'}} className={styles.navbarItem}>folder</div>
                </ul>
                <ul className={styles.navLinkEnd}>
                    <div className={styles.navbarItem}>login</div>
                    <div className={styles.special} >sing up</div>
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