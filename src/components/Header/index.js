import React from 'react'
import './style.css';

function Header() {

    function handleLogout(){
        alert("Logout Successfully")
    }
    return (
        <div className='navbar'>
            <p className='logo'>
                Financly.
            </p>
            <p className='logo link' onClick={handleLogout}>Logout</p>
        </div>
    )
}

export default Header
