import React, {useState} from 'react';
import Navbar from "./navbar/Navbar";

const Header = () => {

    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleNavbar = (isOpen=null) => {
        if(isOpen !==null){
            setNavbarOpen(!navbarOpen);
        }else {
            setNavbarOpen(isOpen);
        }
    }
    
    return (
        <Navbar navbarState={navbarOpen} handleNavbar={handleNavbar}/>
    );
}
export default Header;