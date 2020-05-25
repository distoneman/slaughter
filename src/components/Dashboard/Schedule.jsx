import React, { Component } from 'react';
import axios from 'axios';

import './Dashboard.css';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            available: true,
            numSlotsAvailable: 0
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
                numSlotsAvailable: res.data[0].max_slots - res.data[0].used_slots
            })
        )
        console.log(this.state)
        // console.log(res.data)
    }

    render() {
        return (
            <div>
                {this.state.available ? (
                    <>
                        <div className='available-msg'>
                            {this.state.numSlotsAvailable} available slots
                        </div>
                        <hr />
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