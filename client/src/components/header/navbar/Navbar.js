import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import styles from './Navbar.module.scss';
import Brand from '../brand/Brand';
import Burgermenu from '../burgermenu/Burgermenu';
import CollapseMenu from '../collapsemenu/Collapsemenu';
import DropDownMenu from '../dropdownmenu/DropDownMenu';
import PropTypes from 'prop-types';

const Navbar = ({navbarState, handleNavbar, auth: {isAuthenticated, loading}, logout }) => {

    

    const authLinks = (
        <>
            <DropDownMenu />
            <Link className={styles.navbarItem} to='/dashboard'>dashboard</Link>
            <Link onClick={logout} className={styles.special} to='/'>logout</Link>
        </>
    );

    const guestLinks = (
        <>
            <Link className={styles.navbarItem} to='/login'>login</Link>
            <Link className={styles.special} to='/register'>register</Link>
        </>
    );
    
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <Link className={styles.minlogo} to='/'><Brand /></Link>
                    <ul className={styles.navLinkStart}>
                        <Link className={styles.logo} to='/'><Brand /></Link>
                        <div style={{marginLeft: 30 + 'px'}} className={styles.navbarItem}>about</div>
                        <Link style={{marginLeft: 30 + 'px'}} className={styles.navbarItem} to='/profiles'>profiles</Link>
                    </ul>
                    <ul className={styles.navLinkEnd}>
                        {(!loading && isAuthenticated) ? authLinks : guestLinks}
                    </ul>
                    <div className={styles.burgerWrapper}>
                        <Burgermenu 
                            navbarState = {navbarState}
                            handleNavbar = {handleNavbar}
                        />
                    </div>
                </div>

            </nav>
            <CollapseMenu 
                navbarState = {navbarState}
                handleNavbar = {handleNavbar}
            />
        </>
    );
};

Navbar.protoType = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);