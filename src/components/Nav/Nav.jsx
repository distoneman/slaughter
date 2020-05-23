import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaCog, FaHome} from 'react-icons/fa';

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
                <div>
                        <Link to="/settings" className='nav-link'>
                            <FaCog />
                        </Link>                    {/* </BrowserRouter> */}

                </div>
            </div>
        )
    }
}