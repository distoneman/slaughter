import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './Dashboard.css';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            available: true,
            numSlotsAvailable: 0,
            schedDate: '',
            customerName: '',
            customerPhone: '',
            notes: '',
            slotsArray: []
        }

    }

    async componentDidMount() {
        // console.log(this.props)
        let res = await axios.get(`/schedule/available_slots/${this.props.id}`)
        if (res.data[0].used_slots === res.data[0].max_slots) {
            this.setState({
                available: false
            })
            // alert("no slots available")
        } else (
            this.setState({
                available: true,
                schedDate: res.data[0].slot_date,
                numSlotsAvailable: res.data[0].max_slots - res.data[0].used_slots
            })
        )
        this.createSlotsArray()
        // console.log(this.state)
        // console.log(res.data)
    }

    createSlotsArray = async () => {
        var slotsArray=[];
        var i;
        for (i = 1; i <= this.state.numSlotsAvailable; i++) {
            slotsArray.push(i)
        }
        // console.log(slotsArray)
        this.setState({
            slotsArray: slotsArray
        })
        // console.log(this.state.slotsArray)
    }

    render() {
        let options = this.state.slotsArray.map((num) =>
            <option
                key={num}
                value={num}
            >
                {num}
            </option>
        );

        return (
            <div>
                {this.state.available ? (
                    <>
                        <div className='available-msg'>
                            {this.state.numSlotsAvailable} available slots for {moment(this.state.schedDate).utc().format("dddd, MMM Do YYYY")}
                        </div>
                        <hr />
                        <div className='schedule-form'>
                            <label className='form-label'>Number of animals:</label>
                            <select className="form-user-input" id="slots">
                                {/* <option value="beef">Beef</option> */}
                                {options}
                            </select>

                            <label className='form-label'>Customer Name:</label>
                            <input className='form-user-input' />
                            <label className='form-label'>Customer Phone:</label>
                            <input className='form-user-input' />
                            <label className='form-label'>Schedule Notes:</label>
                            <input className='form-user-input' />
                            <div></div>
                            <button className='search-button'>Save</button>
                        </div>
                    </>
                ) : (
                        <div>
                            <div className='available-msg'>
                                There are no slots available
                        </div>
                            <button className='search-button'
                                onClick={this.props.toggleSchedule}>
                                Close
                        </button>
                        </div>
                    )}

                {/* {console.log(this.props.id)}
                Schedule {this.props.id} */}
            </div>
        )
    }
}