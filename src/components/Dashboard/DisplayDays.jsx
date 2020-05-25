import React, { Component } from 'react';
import { FaPrint, FaTrashAlt, FaEdit, FaSearch, FaEnvelope } from 'react-icons/fa';
import { Link } from "react-router-dom";
// import { IoIosMail, IoIosText } from "react-icons/io";
import { FaCalendarPlus } from 'react-icons/fa';
import Schedule from './Schedule';

import './Dashboard.css'

export default class DisplayDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleModal: false
        }

    }

    toggleSchedule = async () => {
        await this.setState({
            scheduleModal: !this.state.scheduleModal
        })
        if (this.state.scheduleModal === false) {
            this.props.getDailyDetail();
        }
        console.log(this.state.scheduleModal)
    }



    render() {

        return (
            <>
                {this.state.scheduleModal ? (
                    <div className="schedule-view">
                        <button className='close-schedule-modal' onClick={this.toggleSchedule}>X</button>
                        <Schedule
                        //  searchType={this.props.searchType}
                         id={this.props.id}
                        />
                    </div>
                ) : (
                        null
                    )}

                    <div className='search-item' key={this.props.id}>{this.props.fDate}</div>
                    <div className='search-item'>{this.props.animal_type}</div>
                    <div className='search-item'>{this.props.used_slots}/{this.props.max_slots}
                        <FaCalendarPlus className='fa-icon' onClick={this.toggleSchedule} />
                    </div>
                    <div className='search-item'>Edit Slots</div>
            </>
        )
    }
}