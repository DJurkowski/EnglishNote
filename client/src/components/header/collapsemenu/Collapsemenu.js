import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Collapsemenu.module.scss';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import { connect } from 'react-redux';
import useWindowDimensions from '../../../hooks/useWindowDimensions'


const CollapseMenu = ({ navbarState, handleNavbar, auth: { isAuthenticated, loading }, logout}) => {
   
    const {width} = useWindowDimensions();

    const handleLogoutButton = () => {
        handleNavbar(false);
        logout();
    };

    const authLinks = (
        <>
            <li><Link onClick={()=> handleNavbar(false)} className={styles.navbarItem} to='/posts'>posts</Link></li>
            <li><Link onClick={()=> handleNavbar(false)} className={styles.navbarItem} to='/myfolders'>my folders</Link></li>
            <li><Link onClick={()=> handleNavbar(false)} className={styles.navbarItem} to='/allfolders'>all folders</Link></li>
            <li><Link onClick={()=> handleNavbar(false)} className={styles.navbarItem} to='/create-folder'>add folder</Link></li>
            <li><Link onClick={()=> handleNavbar(false)} className={styles.navbarItem} to='/dashboard'>dashboard</Link></li>
            <li><Link onClick={handleLogoutButton} className={styles.navbarItem} to='/'>logout</Link></li>
        </>
    );

    const questLinks = (
        <>
            <li><Link onClick={()=> handleNavbar(false)} className={styles.navbarItem} to='/register'>register</Link></li>
            <li><Link onClick={()=> handleNavbar(false)} className={styles.navbarItem} to='/login'>login</Link></li>    
        </>
    );
    
    if(navbarState === true && width <= 769) {
        return (
            
            <div className={styles.wrapper}>
                <ul className={styles.navLinks}>
                    <li><Link onClick={()=> handleNavbar(false)} className={styles.navbarItem} to='/profiles'>profiles</Link></li>
                    {(!loading && isAuthenticated) ? authLinks : questLinks}
                </ul>
            </div>
        );
    } else {          
        return null;
    }
};

CollapseMenu.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(CollapseMenu);