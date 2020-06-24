import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import DisplayDefaults from './DisplayDefaults';

import './Settings.css'


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animalType: 'Beef',
            searchYear: '',
            searchMonth: '',
            daysInMonth: 0,
            dailyDetail: [],
            monthlyDefaults: []
        }
    }

    async componentDidMount() {
        this.getDefaultSlotsValues();
    }

    getDefaultSlotsValues = async () => {
        const res = await axios.get(`/settings/getDefaultMonth/${this.state.searchMonth}`)
        // console.log(res.data)
        this.setState ({
            monthlyDefaults: res.data
        })

    }

    async handleChange(key, value) {
        // console.log("handle Change")
        console.log(key)
        console.log(value.target.value)
        await this.setState({
            [key]: value.target.value
        });
        console.log(this.state)
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
            // this.getDailyDetail()
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
        var displayDefaults  = this.state.monthlyDefaults.map(slot => {
            return(
                <DisplayDefaults
                    key={slot.id}
                    id={slot.id}
                    animalType = {slot.animal_type}
                    killMonth = {slot.kill_month}
                    maxSlots = {slot.default_max_slots}
                    updateSlots  = {this.updateSlots}
                    getDefaultSlotsValues = {this.getDefaultSlotsValues}
                />
            )
        })

        return (
            <div className='settings-page'>
                <div className='page-title'>
                    Settings
                </div>
                <hr />
                <div className='search-row'>
                    <div className='page-sub-title'>Populate Based On Default Numbers</div>
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
                    <button className='search-button' onClick={this.addDays}>Add</button>
                </div>
                <hr />
                <div className='page-sub-title'>Monthly Default Values</div>
                <div className='monthly-slots-container'>
                    <div className='monthly-slots-title-row'>Month</div>
                    <div className='monthly-slots-title-row'>Animal Type</div>
                    <div className='monthly-slots-title-row'>Max Slots</div>
                    {displayDefaults}
                </div>
            </div>

        )
    }
}
