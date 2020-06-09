import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import DisplayWaitlist from './DisplayWaitlist'


import './../OneDay/OneDay.css';
import './../SearchCustomer/SearchCustomer.css';

export default class Waitlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animalType: '',
            waitList: []
        }
    }

    async handleChange(key, value) {
        // console.log("handle Change")
        // console.log(key)
        // console.log(value.target.value)
        await this.setState({
            [key]: value.target.value
        });
        // console.log(this.state)
    }

    getWaitlist = async () => {
        let schedDate = moment().format('l');
        const res = await axios.get(`/schedule/get_waitlist/?schedDate=${schedDate}&animalType=${this.state.animalType}`)
        this.setState({
            waitList: res.data
        })
        // console.log(this.state)
    }


    render() {
        let displayWaitlist = this.state.waitList.map(cust => {
            return (
                <DisplayWaitlist
                    key={cust.sched_id}
                    id={cust.sched_id}
                    slotId={cust.k_slots_id}
                    replaceId={this.props.id}
                    replaceDate={this.props.schedDate}
                    replaceSlotId={this.props.slotId}
                    animalType={cust.animal_type}
                    schedDate={cust.sched_date}
                    custName={cust.cust_name}
                    custPhone={cust.cust_phone}
                    notes={cust.notes}
                    swapAllowed = {false}
                />
            )
        })
        return (
            <div>
                <div className='search-bar'>
                    <label className='form-label'>Animal Type:</label>
                    <select name='animal-type' id='animal-type'
                        className='search-select'
                        onChange={e => this.handleChange('animalType', e)}>
                        <option value=""></option>
                        <option value='Beef'>Beef</option>
                        <option value='Pork'>Pork</option>
                        <option value='Sheep'>Sheep</option>
                    </select>
                    <button className='search-button'
                        onClick={() => this.getWaitlist()}>Go</button>
                </div>
                <hr />
                <div className='waitlist-title-row'>
                    <div className='waitlist-title-item'>Date Scheduled</div>
                    <div className='waitlist-title-item'>Customer Name</div>
                    <div className='waitlist-title-item'>Customer Phone</div>
                    <div> </div>
                    {displayWaitlist}
                </div>
            </div>
        )
    }
}