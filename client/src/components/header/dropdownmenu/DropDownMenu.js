import React, {useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../navbar/Navbar.module.scss';

const DropDownMenu = () => {

    const node = useRef();

    const [open, setOpen] = useState(false);

    const handleClik = e => {
        if(node.current.contains(e.target)) {
            return;
        }

        setOpen(false);
    }

    useEffect(()=> {
        document.addEventListener('mousedown', handleClik);

        return () => document.removeEventListener("mousedown", handleClik);
    }, []);
    

    return (
        <div ref={node} className={styles.navbarItem}>
            <button onClick={e => setOpen(!open)}  className={styles.button}>folders <i className="fa fa-caret-down"></i></button>
            {open &&
            <ul className={styles.dropdown_menu}>
                <li><Link onClick={()=> setOpen(false)} className={styles.dropdown_menu_item} to='/myfolders'>my folders</Link></li>
                <li><Link onClick={()=> setOpen(false)} className={styles.dropdown_menu_item} to='/allfolders'>all folders</Link></li>
                <li><Link onClick={()=> setOpen(false)} className={styles.dropdown_menu_item} to='/create-folder'>add folder</Link></li>
            </ul>
            }
        </div>
    );
};


export default DropDownMenu;