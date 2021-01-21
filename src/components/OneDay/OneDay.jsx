import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';

import Schedule from '../Dashboard/Schedule';
import DisplayOneDay from './DisplayOneDay';
import './OneDay.css';
import imageBeef from '../../images/cow.png';
import imagePork from '../../images/pig.png';
import imageSheep from '../../images/sheep.png'

export default class OneDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slotId: null,
            schedDate: '',
            animalType: '',
            daysSchedule: [],
            cancelModal: false,
            animalIcon: null
        }

    }

    async componentDidMount() {
        // console.log(this.props)
        let { id } = this.props.match.params;
        this.setState({
            slotId: id
        })
        await this.getScheduleById(id)
        if (this.state.animalType === 'Beef') {
            this.setState({
                animalIcon: imageBeef
            })
        } else if (this.state.animalType === 'Pork') {
            this.setState({
                animalIcon: imagePork
            })
        } else {
            this.setState({
                animalIcon: imageSheep
            })
        }
        // console.log(this.state)
    }

    getScheduleById = async(id) => {
    const res = await axios.get(`/schedule/get_one_day/${id}`)
    this.setState({
        slotId: id,
        schedDate: res.data[0].sched_date,
        animalType: res.data[0].animal_type,
        daysSchedule: res.data
    })

}

getScheduleByDate = async (direction) => {
    // console.log(direction)
    // console.log(this.state.schedDate)
    var date = new Date(this.state.schedDate)
    // console.log(date)
    let dow = date.getDay()
    // console.log(dow)
    if (direction === 'add') {
        switch (dow) {
            case 5:
                var searchDate = moment(this.state.schedDate).add(3, 'd').format('l')
                break;
            default:
                searchDate = moment(this.state.schedDate).add(1, 'd').format('l')
        }
    } else {
        switch (dow) {
            case 1:
                searchDate = moment(this.state.schedDate).subtract(3, 'd').format('l')
                break;
            default:
                searchDate = moment(this.state.schedDate).subtract(1, 'd').format('l')
        }
    }
    const res = await axios.get(`/schedule/getScheduleByDate/?schedDate=${searchDate}&animalType=${this.state.animalType}`)
    // console.log(res.data)
    // console.log(this.state)
    if (res.data.length === 0) {
        // alert("nobody scheduled")
        // console.log(searchDate)
        // console.log(this.state.animalType)
        const res = await axios.get(`/schedule/getSlotId/?schedDate=${searchDate}&animalType=${this.state.animalType}`)
        // console.log(res.data)
        this.setState({
            schedDate: searchDate,
            // slotId: res.data[0].k_slots_id,
            slotId: res.data[0].id,
            // animalType: res.data[0].animal_type,
            daysSchedule: []
        })
        
    } else {
        console.log(res.data[0])
        this.setState({
            schedDate: res.data[0].sched_date,
            animalType: res.data[0].animal_type,
            slotId: res.data[0].k_slots_id,
            daysSchedule: res.data
        })
    }
    // console.log(this.state)
}


cancelSchedule = async (id, cancelledBy) => {
    // console.log('cancel schedule')
    console.log(this.state)
    // console.log(cancelledBy)
    let schedDate = this.state.schedDate
    let animalType = this.state.animalType
    let slotId = this.state.slotId
    let statusDate = moment(new Date()).format('l')
    // console.log(statusDate)
    const res = await axios.put(`/schedule/cancel`,
        { id, slotId, schedDate, animalType, statusDate, cancelledBy })
    // console.log(res.data)
    this.setState({
        daysSchedule: res.data
    })
}

updateCustomer = async (id, custName, custPhone, notes, waitlistFlag, schedStatus, rescheduledFlag, slotId) => {
    // console.log(id, custName, custPhone, notes)
    console.log(rescheduledFlag)
    let schedDate = this.state.schedDate
    let animalType = this.state.animalType
    const res = await axios.put(`/schedule/updateCustomer`, 
        {id, custName, custPhone, notes, schedDate, animalType, waitlistFlag, schedStatus, rescheduledFlag, slotId})
    // await console.log(res.data)
    this.setState({
        daysSchedule: res.data
    })
}

confirmSchedule = async(id) => {
    let schedDate = this.state.schedDate
    let animalType = this.state.animalType
    const res = await axios.put(`/schedule/confirm`,
        {id, schedDate, animalType})
    // console.log(res.data)
    this.setState({
        daysSchedule: res.data
    })
}

deleteAppointment = async (id, slotId) => {
    // console.log(id)
    // console.log(slotId)
    let schedDate = this.state.schedDate
    let animalType = this.state.animalType
    const res = await axios.put(`/schedule/deleteAppointment`, 
        {id, slotId, schedDate, animalType})
    await this.setState({
        daysSchedule: res.data
    })
}


toggleSchedule = async () => {
    // console.log('toggle schedule modal')
    // console.log(this.state.slotId)
    await this.setState({
        scheduleModal: !this.state.scheduleModal
    })
    if (this.state.scheduleModal === false) {
        this.getScheduleById(this.state.slotId);
    }
}

render() {
    let displayOneDaySchedule = this.state.daysSchedule.map(slot => {
        return (
            <DisplayOneDay
                key={slot.sched_id}
                id={slot.sched_id}
                slotId={slot.k_slots_id}
                schedDate={slot.sched_date}
                animalType={slot.animal_type}
                custName={slot.cust_name}
                custPhone={slot.cust_phone}
                schedStatus={slot.sched_status}
                statusChangeDate={slot.status_change_date}
                cancelledBy={slot.cancelled_by}
                waitlistFlag={slot.waitlist_flag}
                notes={slot.notes}
                cancelSchedule={this.cancelSchedule}
                toggleCancelModal={this.toggleCancelModal}
                getScheduleById={this.getScheduleById}
                confirmSchedule={this.confirmSchedule}
                updateCustomer={this.updateCustomer}
                deleteAppointment={this.deleteAppointment}
            />
        )
    })
    return (
        <>
            {this.state.scheduleModal ? (
                <div className="schedule-view">
                    <button className='close-schedule-modal' onClick={this.toggleSchedule}>X</button>
                    <Schedule
                        //  searchType={this.props.searchType}
                        id={this.state.slotId}
                        toggleSchedule={this.toggleSchedule}
                        scheduleDate={this.state.schedDate}
                    />
                </div>
            ) : (
                    null
                )}


            <div className='header'>
                <div className='header-content'>
                    <FaChevronCircleLeft className='btn-arrows'
                        onClick={e => this.getScheduleByDate("subtract")} />
                </div>
                <div>
                    <img src={this.state.animalIcon} alt="Beef Icon" className="animal-icon" />
                </div>
                <div className='header-content'>
                    {moment(this.state.schedDate).utc().format('dddd, MMMM Do YYYY')}
                </div>
                <div className='header-content'>
                    <FaChevronCircleRight className='btn-arrows'
                        onClick={e => this.getScheduleByDate("add")} />
                </div>
            </div>
            <hr />
            <div className='schedule-title-row'>
                <div>
                    <button className='search-button-lrg'
                        onClick={this.toggleSchedule}>Schedule</button>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className='schedule-title-item'>Animal Type</div>
                <div className='schedule-title-item'>Name</div>
                <div className='schedule-title-item'>Phone</div>
                <div className='schedule-title-item'>Status</div>
                <div className='schedule-title-item'>Status Date</div>
                <div className='schedule-title-item'>Notes</div>
                <div className='schedule-title-item'></div>
                {displayOneDaySchedule}
            </div>
        </>
    )
}
}