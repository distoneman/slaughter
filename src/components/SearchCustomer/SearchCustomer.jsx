import React, { Component } from 'react';
import axios from 'axios';

import DisplayCustomers from './DisplayCustomers';
import './SearchCustomer.css';

export default class SearchCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
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


    getCustomerByName = async () => {
        // console.log("get function")
        // console.log(this.state)
        const res = await axios.get(`/search/by_name/${this.state.searchName}`)
        // console.log(res)
        this.setState({
            searchResults: res.data
        })
        // console.log(this.state)
    }

    render() {
        let displayCustomers = this.state.searchResults.map(cust => {
            return (
                <DisplayCustomers
                    key={cust.sched_id}
                    schedDate={cust.sched_date}
                    animalType={cust.animal_type}
                    custName={cust.cust_name}
                    custPhone={cust.cust_phone}
                    schedStatus={cust.sched_status}
                    statusDate={cust.status_change_date}
                    cancelledBy={cust.cancelled_by}
                    waitList={cust.waitlist_flag}
                    notes={cust.notes}
                />
            )
        })
        return (
            <div>
                <div className='search-bar'>
                    <label className='form-label'>Customer Name:</label>
                    <input className='form-user-input'
                        onChange={e => this.handleChange("searchName", e)} />
                    <button className='search-button'
                        onClick={() => this.getCustomerByName()}>Search</button>
                </div>
                <hr />
                {displayCustomers}
            </div>
        )
    }
}