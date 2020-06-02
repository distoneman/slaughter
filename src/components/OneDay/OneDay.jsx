import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';

import DisplayOneDay from './DisplayOneDay';
import './OneDay.css';

export default class OneDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedDate: '',
            animalType: '',
            daysSchedule: []
        }

    }

    async componentDidMount() {
        console.log(this.props)
        let { id } = this.props.match.params;
        const res = await axios.get(`/schedule/get_one_day/${id}`)
        this.setState({
            schedDate: res.data[0].sched_date,
            animalType: res.data[0].animal_type,
            daysSchedule: res.data
        })
        console.log(this.state)
    }

    getScheduleByDate = async (direction) => {
        console.log(direction)
        var date = new Date(this.state.schedDate)
        console.log(date)
        let dow = date.getDay()
        console.log(dow)
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
        console.log(res.data)
        if (res.data.length === 0) {
            alert("nobody scheduled")
            this.setState({
                schedDate: searchDate,
                // res.data[0].sched_date,
                // animalType: res.data[0].animal_type,
                daysSchedule: []
            })

        } else {
            this.setState({
                schedDate: res.data[0].sched_date,
                animalType: res.data[0].animal_type,
                daysSchedule: res.data
            })
        }
    }

    async handleChange(key, value) {
        // console.log(key)
        // console.log(value.target.value)
        // this.setState({
        //     [key]: value.target.value
        // })
        // console.log(this.state)
    }



    render() {
        let displayOneDaySchedule = this.state.daysSchedule.map(slot => {
            return (
                <DisplayOneDay
                    key={slot.id}
                    id={slot.id}
                    schedDate={slot.sched_date}
                    animalType={slot.animal_type}
                    custName={slot.cust_name}
                    custPhone={slot.cust_phone}
                    schedStatus={slot.sched_status}
                    statusChangeDate={slot.status_change_date}
                    cancelledBy={slot.cancelled_by}
                    waitlistFlag={slot.waitlist_flag}
                    notes={slot.notes}
                />
                // <>
                //     <div>
                //         {slot.cust_name}
                //     </div>
                //     <div>{slot.cust_phone}</div>
                // </DisplayOneDay>
            )
        })
        return (
            <>
                <div className='header'>
                    <div className='header-content'>
                        <FaChevronCircleLeft className='btn-arrows'
                            onClick={e => this.getScheduleByDate("subtract")} />
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