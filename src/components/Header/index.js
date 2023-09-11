import React, { useEffect } from 'react'
import './style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';

function Header() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, loading]);

    function handleLogout() {
        try {
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success("Sign Out Successfully");
                navigate('/');
            }).catch((error) => {
                // An error happened.
                toast.error(error.message);
            });
        }
        catch (e) {
            toast.error(e.message);
        }
    }
    return (
        <div className='navbar'>
            <p className='logo'>
                Financly.
            </p>
            {
                user &&
                <p className='logo link' onClick={handleLogout}>Logout</p>
            }

        </div>
    )
}

export default Header
