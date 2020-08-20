import React, { Component } from 'react';
import axios from 'axios';

import DisplayCustomers from './DisplayCustomers';
import './SearchCustomer.css';

export default class SearchCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'name',
            searchCriteria: '',
            searchResults: []
        }

    }

    // async componentDidMount() {
    // }

    async handleChange(key, value) {
        // console.log(key)
        // console.log(value.target.value)
        this.setState({
            [key]: value.target.value
        })
        // console.log(this.state)
    }

    search = async () => {
        if (this.state.searchType === 'name') {
            this.getCustomerByName()
        }
        else if (this.state.searchType === 'phone') {
            this.getCustomerByPhone()
        }
        else {
            this.getCustomerByStatusDate()
        }

    }

    getCustomerByName = async () => {
        // console.log("get function")
        // console.log(this.state)
        const res = await axios.get(`/search/by_name/${this.state.searchCriteria}`)
        // console.log(res.data)
        this.setState({
            searchResults: res.data
        })
        // console.log(this.state)
    }

    getCustomerByPhone = async () => {
        // console.log('by phone')
        const res = await axios.get(`/search/by_phone/${this.state.searchCriteria}`)
        // console.log(res.data)
        this.setState({
            searchResults: res.data
        })
    }

    getCustomerByStatusDate = async () => {
        const res = await axios.get(`/search/by_status_date/?statusDate=${this.state.searchCriteria}`)
        this.setState({
            searchResults: res.data
        })
    }

    updateCustomer = async (id, custName, custPhone, notes, waitlistFlag) => {
        // console.log(id, custName, custPhone, notes)
        let schedDate = this.state.schedDate
        let animalType = this.state.animalType
        await axios.put(`/schedule/updateCustomer`, 
            {id, custName, custPhone, notes, schedDate, animalType, waitlistFlag})
        // await console.log(res.data)
        await this.search()
        // this.setState({
        //     searchResults: res.data
        // })
    }
    

    render() {
        let displayCustomers = this.state.searchResults.map(cust => {
            // console.log(cust.waitlist_flag)
            if (cust.waitlist_flag === true) {
                var waitList = 'Yes'
            } else {
                waitList = 'No'
            }
            return (
                <DisplayCustomers
                    key={cust.sched_id}
                    id={cust.sched_id}
                    schedDate={cust.sched_date}
                    phone={cust.cust_phone}
                    animalType={cust.animal_type}
                    custName={cust.cust_name}
                    custPhone={cust.cust_phone}
                    schedStatus={cust.sched_status}
                    statusDate={cust.status_change_date}
                    cancelledBy={cust.cancelled_by}
                    waitList={waitList}
                    notes={cust.notes}
                    updateCustomer={this.updateCustomer}
                    waitlistFlag={cust.waitlist_flag}
                />
            )
        })
        return (
            <div>
                <div className='search-bar'>
                    <div>
                        <label className='form-label'>Search By:</label>
                        <select name='search-by' id='search-by' className='search-select'
                            onChange={e => this.handleChange('searchType', e)}>
                            <option value='name'>Customer Name</option>
                            <option value='phone'>Phone Number</option>
                            <option value='statusDate'>Status Date</option>
                        </select>
                    </div>
                    <div>
                        <label className='form-label'>Search Criteria:</label>
                        <input className='form-user-input'
                            onChange={e => this.handleChange("searchCriteria", e)} />
                        <button className='search-button'
                            onClick={() => this.search()}>Search</button>
                    </div>
                </div>
                <hr />
                <div className='cust-results-container'>
                    <div className='cust-results-item-title'>Customer Name</div>
                    <div className='cust-results-item-title'>Animal</div>
                    <div className='cust-results-item-title'>Phone</div>
                    <div className='cust-results-item-title'>Date Scheduled</div>
                    <div className='cust-results-item-title'>Status</div>
                    <div className='cust-results-item-title'>Status Date</div>
                    <div className='cust-results-item-title'>Waitlist</div>
                    <div className='cust-results-item-title'>Notes</div>
                    {displayCustomers}
                </div>
            </div>
        )
    }
}