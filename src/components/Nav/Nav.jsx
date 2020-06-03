import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaCog, FaHome, FaSearch} from 'react-icons/fa';

import './Nav.css';

export default class Nav extends Component {

    render() {
        return (
            <div className='nav-bar'>
                <div>
                        <Link to="/" className='nav-link'>
                            <FaHome className='nav-link home'/>                           
                            Slaughter Schedule
                        </Link>
                </div>
                <div className='nav-search-container'>
                        <input className='nav-search-input'/>
                        <FaSearch className='nav-search-icon'/>
                        <Link to="/settings" className='nav-link'>
                            <FaCog className='nav-settings-icon'/>
                        </Link>

                </div>
            </div>
        )
    }
}