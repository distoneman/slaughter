import React, { Component } from 'react';
import moment from 'moment';
// import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa'

import './OneDay.css';

export default class DisplayOneDay extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className='schedule-item'>
                    {this.props.animalType}
                </div>
                <div className='schedule-item'>
                    {this.props.custName}
                </div>
                <div className='schedule-item'>
                    {this.props.custPhone}
                </div>
                <div className='schedule-item'>
                    {this.props.schedStatus}
                </div>
                <div className='schedule-item'>
                    {moment(this.props.statusChangeDate).format('l')}
                </div>
                <div className='schedule-item'>
                    {this.props.notes}
                </div>
                <div className='schedule-item'>
                    <FaTrashAlt className='fa-icon' />
                </div>
            </>
        )
    }
}