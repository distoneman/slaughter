import React, { Component } from 'react';
// import axios from 'axios';
import moment from 'moment';
import { FaExchangeAlt } from 'react-icons/fa'

import './../OneDay/OneDay.css'
// import './OneDay.css';
import axios from 'axios';

export default class DisplayWaitlist extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {

    //     // }
    // }

    fillFromWaitlist = async () => {
        // console.log('fill from waitlist')
        // console.log(this.props)
        if (this.props.swapAllowed === false) {

        } else {
            // console.log(this.props.slotId)   // k_slots id of original date
            // console.log(this.props.replaceSlotId)  
            await axios.post('/schedule/fill_from_waitlst', {
                schedId: this.props.id,  // k_schedule sched_id
                schedDate: this.props.replaceDate,
                animalType: this.props.animalType,
                custName: this.props.custName,
                custPhone: this.props.custPhone,
                notes: this.props.notes,
                slotId: this.props.replaceSlotId,  //k_slots id of new date
                OldSlotId: this.props.slotId,  // k_slots id of original date
                replaceId: this.props.replaceId  // k_schedule sched_id
            })
            // console.log(res.data)
            this.props.toggleWaitlistModal();
        }
    }

    render() {

        return (
            <>
                <div key={this.props.id} className='waitlist-item'>
                    {moment(this.props.schedDate).format('l')}
                </div>
                <div className='waitlist-item'>
                    {this.props.custName}
                </div>
                <div className='waitlist-item'>
                    {this.props.custPhone}
                </div>
                <div className='waitlist-item'>
                    {this.props.notes}
                </div>
                <div className='waitlist-item'>
                    <FaExchangeAlt className='fa-icon-left'
                        onClick={this.fillFromWaitlist} />
                </div>
            </>
        )
    }
}