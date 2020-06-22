import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import DisplayDays from './DisplayDays';

import './Dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animalType: 'Beef',
            searchYear: '',
            searchMonth: '',
            daysInMonth: 0,
            dailyDetail: [],
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

    // toggleEditSlots = async () => {
    //     console.log('toggle edit slots')
    // }

    getDailyDetail = async () => {
        // this.setState({
        //     dailyDetail: []
        // })
        // console.log('get daily detail')
        // console.log(this.state.animalType)
        let animalType = this.state.animalType
        let year = this.state.searchYear
        let month = this.state.searchMonth
        const res = await axios.get(`/settings/get_daily/${animalType}&${year}&${month}`)
        // console.log(res.data)
        if (res.data.length === 0) {
            // console.log("empty")
        }
        else {
            // console.log(res.data)
            this.setState({
                dailyDetail: res.data
            })
            // await console.log(res.data)
        }
    }


    addDays = async () => {
        // console.log("add Days")
        await this.getDailyDetail();
        if (this.state.dailyDetail.length > 0) {
            // console.log("already populated")
            alert('Dates Already Populated')
        } else {
            const res = await axios.get(`/settings/getDefault/${this.state.animalType}&${this.state.searchMonth}`)
            let defaultMaxSlots = res.data[0].default_max_slots
            let numDays = 0
            numDays = new Date(this.state.searchYear, this.state.searchMonth, 0).getDate();
            var i;
            for (i = 1; i <= numDays; i++) {
                var dateStr = `${this.state.searchMonth}/${i}/${this.state.searchYear}`
                var date = new Date(dateStr)
                var day = date.getDay()
                switch (day) {
                    case 0:
                        // console.log("Today is Weekend");
                        break;
                    case 6:
                        // console.log("Today is Weekend");
                        break;
                    default:
                        await this.addSlots(date, defaultMaxSlots)
                }
            }
            alert("slots added")
            this.getDailyDetail()
        }
    }

    addSlots = async (slot_date, max_slots) => {
        await axios.post('/settings/addSlots', {
            slot_date: moment(slot_date).format('l'),
            animal_type: this.state.animalType,
            max_slots: max_slots
        })
    }


    render() {
        if (this.state.dailyDetail.length === 0) {
            var displayDays = "No data for selected criteria click 'Add' button to populate using defaults. Then search again."
        }
        else {
            displayDays = this.state.dailyDetail.map(day => {
                let fDate =( moment(day.slot_date).format('MM/D, dddd'))
                var availableSlots = day.max_slots - day.used_slots
                return (
                    <DisplayDays
                        key={day.id}
                        id={day.id}
                        fDate = {fDate}
                        // sched_date = {day.sched_date}
                        slot_date = {day.slot_date}
                        animal_type = {day.animal_type}
                        used_slots = {day.used_slots}
                        available_slots = {availableSlots}
                        max_slots = {day.max_slots}
                        getDailyDetail = {this.getDailyDetail}
                        // toggleSlotsModal = {this.toggleEditSlots}
                    />

                )
            })
        }


        return (
            <div>
                <hr />
                <label className='search-label'>Animal Type:</label>
                <select name="animal-type" id="animal-type"
                    className='search-select'
                    onChange={e => this.handleChange("animalType", e)}>
                    <option value=""></option>
                    <option value='Beef'>Beef</option>
                    <option value='Pork'>Pork</option>
                    <option value='Sheep'>Sheep</option>
                </select>
                <label className='search-label'>Year:</label>
                <select name="year" id="year" className='search-select'
                    onChange={e => this.handleChange("searchYear", e)}>
                    <option value=""></option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
                <label className='search-label'>Month:</label>
                <select name="month" id="month" className='search-select'
                    onChange={e => this.handleChange("searchMonth", e)}>
                    <option value=""></option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <button className='search-button'
                    onClick={this.getDailyDetail} >Search
                </button>
                <button className='search-button' onClick={this.addDays}>Add</button>
                <hr />
                <div className='search-results-title'>
                    <div className='search-results-item-title'>Date</div>
                    <div className='search-results-item-title'>Animal</div>
                    <div className='search-results-item-title'>Available Slots</div>
                    <div className='search-results-item-title'></div>
                    {displayDays}
                </div>
            </div>
        )
    }
}

