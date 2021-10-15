import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { FaFireAlt } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { FiMonitor } from "react-icons/fi";
import { ImSearch } from "react-icons/im";





const Navbar = ()=>{
    return(
        <nav className='navbar'>
            <div className='nav-items'>
                <NavLink exact to='/'className='nav-item' activeClassName='selected'>
                    <FaFireAlt className='nav-icon'/>
                    <p>Trending</p>
                </NavLink>
                <NavLink exact to='/movies' className='nav-item' activeClassName='selected'>
                    <MdMovie className='nav-icon'/>
                    <p>Movies</p>
                </NavLink>
                <NavLink exact to='/tv' className='nav-item' activeClassName='selected'>
                    <FiMonitor className='nav-icon'/>
                    <p>TV Series</p>
                </NavLink>
                <NavLink exact to='/search' className='nav-item' activeClassName='selected'>
                    <ImSearch className='nav-icon'/>
                    <p>Search</p>
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;