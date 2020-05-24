import React, { Component } from "react";
import axios from 'axios';
import './Settings.css';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animalType: '',
            searchYear: '', 
            searchMonth: '',
            daysInMonth: 0
        }
    }

    async handleChange(key, value) {
        console.log("handle Change")
        console.log(key)
        console.log(value.target.value)
        await this.setState({
            [key]: value.target.value
        });
        console.log(this.state)
    }

    // async getAvailableYears(animalType){
    //     console.log(animalType.target.value)
    //     const res = await axios.get(`/settings/years/${animalType.target.value}`)
    //     console.log(res.data)
    // }


    getDailyDetail = async () => {
        console.log('get daily detail')
        // console.log(this.state.animalType)
        let animalType = this.state.animalType
        let year = this.state.searchYear
        let month = this.state.searchMonth
        const res = await axios.get(`/settings/get_daily/${animalType}&${year}&${month}`
        )
        // console.log(res)
        if (res.data.length === 0) {
            console.log("empty")
        }
        else {
            console.log(res.data)
        }
    }
    

    addDays = async () => {
        console.log("add Days")
        // console.log(this.state.month)
        const res = await axios.get(`/settings/getDefault/${this.state.animalType}&${this.state.searchMonth}`)
        let defaultMaxSlots = res.data[0].default_max_slots
        await console.log(defaultMaxSlots)
        let numDays = 0
        numDays = new Date(this.state.searchYear, this.state.searchMonth, 0).getDate();
        console.log(numDays)
        var i;
        for(i=1; i <= numDays; i++) {
            // console.log(i)
            // console.log(`${this.state.searchMonth}/${i}/${this.state.searchYear}`)
            var dateStr = `${this.state.searchMonth}/${i}/${this.state.searchYear}`
            var date = new Date(dateStr)
            // console.log(typeof date)
            var day = date.getDay()
            // console.log(day)
            switch(day) {
                case 0:
                    // console.log("Today is Weekend");
                break;
                case 6:
                // console.log("Today is Weekend");
                    break;
                    default:
                    // console.log("Today is business day");
                    
                }
        }
    }


    render() {
        return (
            <div>
                <hr/>
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
                    onChange = {e => this.handleChange("searchMonth", e)}>
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
                <button onClick={this.addDays}>test</button>
            </div>
        )
    }
}