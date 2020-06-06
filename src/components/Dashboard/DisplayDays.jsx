import React, { Component } from 'react';
// import { Link } from "react-router-dom";
// import { IoIosMail, IoIosText } from "react-icons/io";
import { FaCalendarPlus, FaClipboardList, FaEdit } from 'react-icons/fa';
import Schedule from './Schedule';
import moment from 'moment';
import { Link } from "react-router-dom";


import './Dashboard.css'

export default class DisplayDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleModal: false,
            editSlotsModal: false
        }

    }

    toggleSchedule = async () => {
        await this.setState({
            scheduleModal: !this.state.scheduleModal
        })
        if (this.state.scheduleModal === false) {
            this.props.getDailyDetail();
        }
    }

    toggleEditSlots = async () => {
        console.log('toggle edit slots')
        this.setState({
            editSlotsModal: !this.state.editSlotsModal
        })
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
                            toggleSchedule={this.toggleSchedule}
                            scheduleDate={this.props.fDate}
                        />
                    </div>
                ) : (
                        null
                    )}

                {this.state.editSlotsModal ? (
                    <div className="edit-slots-view">
                        <button className='close-edit-slots-modal' onClick={this.toggleEditSlots}>X</button>
                        <div>hello</div>
                    </div>
                ) : (
                    null
                )
                }    

                <div className='search-item' key={this.props.id}>{moment(this.props.slot_date).utc().format('dddd, MMM Do YYYY')}
                <Link to={`/oneday/${this.props.id}`}>
                    <FaClipboardList className='fa-icon' />
                </Link>
                </div>
                <div className='search-item'>{this.props.animal_type}</div>
                <div className='search-item'>{this.props.available_slots} / {this.props.max_slots}
                    <FaCalendarPlus className='fa-icon' onClick={this.toggleSchedule} />
                </div>
                <div className='search-item'>Edit Slots
                    <FaEdit className='fa-icon' onClick={this.toggleEditSlots }/>
                </div>
            </>
        )
    }
}