import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { useState,useEffect } from 'react'
const Navbar = () => {
    const navigate = useNavigate();

    const { isLogIn,Logout } = useAuth(); // Destructuring isLogIn from useAuth hook
    const [isLoggedIn, setIsLoggedIn] = useState(isLogIn); // Local state to manage login status

    useEffect(() => {
        setIsLoggedIn(isLogIn); // Update local state when isLogIn changes
    }, [isLogIn]);
    return (
        <section className='navbar'>
            <nav>
                <div onClick={() =>isLogIn?navigate("/dashboard"):navigate('/') }>
                    <h1>IMS</h1>
                    <h3>Inventory Management System</h3>
                </div>

                <div className='nav-menu'>
                    <NavLink to="/contact">ContactUs</NavLink>
                    {isLoggedIn ? (
                        <NavLink to="/" onClick={Logout}> Logout </NavLink>
                    ) : ""}
                </div>

            </nav>
        </section>
    )
}

export default Navbar