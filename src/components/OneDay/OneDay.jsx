import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';


import './OneDay.css';

export default class OneDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedDate: '',
            daysSchedule: []
        }

    }

    async componentDidMount() {
        console.log(this.props)
        let { id } =  this.props.match.params;
        const res = await axios.get(`/schedule/get_one_day/${id}`)
        this.setState({
            schedDate: res.data[0].sched_date,
            daysSchedule: res.data
        })
        console.log(this.state)
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
        return (
            <>
                <div className='header'>
                    <div className='header-content'>
                        <FaChevronCircleLeft className='btn-arrows'/>
                    </div>
                    <div className='header-content'>
                        {moment(this.state.schedDate).utc().format('dddd, MMMM Do YYYY')}
                    </div>
                    <div className='header-content'>
                        <FaChevronCircleRight className='btn-arrows'/>
                    </div>
                </div>
                <hr />
            </>
        )
    }
}