import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Collapsemenu.module.scss';
import useWindowDimensions from '../../../hooks/useWindowDimensions'


const CollapseMenu = (props) => {
   
    const {width} = useWindowDimensions();
    
    if(props.navbarState === true && width <= 769){
        return (
            
            <div className={styles.wrapper}>
                <ul className={styles.navLinks}>
                    <li><div className={styles.navbarItem} >about</div></li>
                    <li><div className={styles.navbarItem} >folders</div></li>
                    <li><div className={styles.navbarItem} >login</div></li>
                    <li><div className={styles.navbarItem} >sing up</div></li>
                </ul>
            </div>
        );
    } else {          
        return null;
    }

};

export default CollapseMenu;