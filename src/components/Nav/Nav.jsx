import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaCog, FaHome, FaSearch, FaListOl, FaAdn } from 'react-icons/fa';

import './Nav.css';

export default class Nav extends Component {



    render() {
        return (
            <div className='nav-bar'>
                <div>
                    <Link to="/" className='nav-link'>
                        <FaHome className='nav-link home' />
                            Slaughter Schedule
                        </Link>
                </div>
                <div className='nav-search-container'>
                    <Link to={`/search`}
                        className='nav-link'>
                        <FaSearch className='nav-search-icon' />
                    </Link>
                    <Link to={`/altlist`}>
                        <FaAdn className='nav-search-icon' />
                    </Link>
                    <Link to={`/waitlist`} className='nav-link'>
                        <FaListOl className='nav-list-icon' />
                    </Link>
                    <Link to="/settings" className='nav-link'>
                        <FaCog className='nav-settings-icon' />
                    </Link>

                </div>
            </div>
        )
    }
}