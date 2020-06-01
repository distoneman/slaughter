import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './Dashboard.css';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slotId: null,
            available: true,
            numSlotsAvailable: 0,
            schedDate: '',
            slots: 1,
            animalType: '',
            customerName: '',
            customerPhone: '',
            notes: '',
            waitList: false,
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
                slotId: this.props.id,
                animalType: res.data[0].animal_type,
                schedDate: res.data[0].slot_date,
                numSlotsAvailable: res.data[0].max_slots - res.data[0].used_slots
            })
        )
        this.createSlotsArray()
        // console.log(this.state)
        // console.log(res.data)
    }

    createSlotsArray = async () => {
        var slotsArray = [];
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

    async handleChange(key, value) {
        // console.log(key)
        // console.log(value.target.value)
        this.setState({
            [key]: value.target.value
        })
        // console.log(this.state)
    }

    async toggleWaitList() {
        await this.setState({
            waitList: !this.state.waitList
        })
    }

    addSchedule = async () => {
        // console.log("add schedule")
        // console.log(this.state)
        // console.log(moment().format('l, h:mm:ss a'))
        for (let i = 1; i <= this.state.slots; i++) {
            await axios.post("/schedule/addSchedule", {
                slotId: this.state.slotId,
                schedDate: moment(this.state.shedDate).format('l'),
                animalType: this.state.animalType,
                custName: this.state.custName,
                custPhone: this.state.custPhone,
                schedStatus: 'Active',
                changeDate: moment().format('l,  h:mm:ss a'),
                waitList: this.state.waitList,
                notes: this.state.notes
            })
        }
        this.props.toggleSchedule();
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
                            <select className="form-user-input" id="slots"
                                onChange={e => this.handleChange("slots", e)}>
                                {/* <option value="beef">Beef</option> */}
                                {options}
                            </select>

                            <label className='form-label'>Customer Name:</label>
                            <input className='form-user-input'
                                onChange={e => this.handleChange("custName", e)} />
                            <label className='form-label'>Customer Phone:</label>
                            <input className='form-user-input'
                                onChange={e => this.handleChange("custPhone", e)} />
                            <label className='form-label'>Waitlist:</label>
                            <input type="checkbox" className='form-checkbox'
                                checked={this.state.waitList}
                                onChange={e => this.toggleWaitList()} />
                            <label className='form-label'>Schedule Notes:</label>
                            <input className='form-user-input'
                                onChange={e => this.handleChange("notes", e)} />
                            <div></div>
                            <button className='search-button'
                                onClick={() => this.addSchedule()}>Save</button>
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