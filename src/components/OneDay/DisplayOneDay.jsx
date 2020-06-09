import React, { Component } from 'react';
import moment from 'moment';
// import axios from 'axios';
import { FaTrashAlt, FaInfoCircle, FaExchangeAlt, FaCheckCircle } from 'react-icons/fa'

import DisplayWaitlist from '../Waitlist/DisplayWaitlist';
import './OneDay.css';
import axios from 'axios';
// import axios from 'axios';

export default class DisplayOneDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelModal: false,
            cancelledBy: '',
            infoModal: false,
            waitlistModal: false,
            waitList: [],
        }
    }

    toggleCancelModal = async () => {
        this.setState({
            cancelModal: !this.state.cancelModal,
            cancelledBy: ''
        })
    }

    toggleInfoModal = async () => {
        // console.log("info modal")
        this.setState({
            infoModal: !this.state.infoModal
        })
        console.log(this.state.infoModal)
    }

    toggleWaitlistModal = async () => {
        // console.log("waitlist modal")
        // console.log(this.props.id)
        // console.log(this.props.schedStatus)
        if (this.props.schedStatus === 'Cancelled') {
            await this.setState({
                waitlistModal: !this.state.waitlistModal
            })
        } else {
            alert('You must cancel first')
        }
        if (this.state.waitlistModal === true) {
            await this.getWaitlist();
        } else {
            this.props.getScheduleById(this.props.slotId)
        }
        // console.log(this.state.waitlistModal)
    }

    getWaitlist = async () => {
        console.log(this.props.schedDate)
        const res = await axios.get(`/schedule/get_waitlist/?schedDate=${this.props.schedDate}&animalType=${this.props.animalType}`)
        this.setState({
            waitList: res.data
        })
        // console.log(this.state)
    }


    async handleChange(key, value) {
        // console.log(key)
        // console.log(value.target.value)
        this.setState({
            [key]: value.target.value
        })
        // console.log(this.state)
    }

    cancel = async () => {
        await this.props.cancelSchedule(this.props.id, this.state.cancelledBy)
        await this.toggleCancelModal()
    }

    confirm = async () => {
        // console.log('confirm')
        if(this.props.schedStatus === 'Scheduled'){
            await this.props.confirmSchedule(this.props.id)
        } else {
            alert("You can only Confirm a Scheduled appointment")
        }
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
                    toggleWaitlistModal={this.toggleWaitlistModal}
                />
            )
        })

        return (
            <>
                {this.state.cancelModal ? (
                    <div className='cancel-modal-view'>
                        <button className='close-cancel-modal' onClick={this.toggleCancelModal}>X</button>
                        <label className='form-label'>Cancelled By:</label>
                        <input className='form-user-input'
                            onChange={e => this.handleChange('cancelledBy', e)} />
                        <button className='search-button'
                            onClick={this.cancel}>
                            Cancel
                        </button>
                    </div>
                ) : (
                        null
                    )}

                {this.state.infoModal ? (
                    <>
                        <div className='info-modal-view'>
                            <button className='close-cancel-modal' onClick={this.toggleInfoModal}>X</button>
                            <div>
                                <b>Cancelled By: </b>{this.props.cancelledBy}
                            </div>
                            <div>
                                <b>Schedule Notes: </b>{this.props.notes}
                            </div>
                        </div>
                    </>
                ) : (
                        null
                    )}

                {this.state.waitlistModal ? (
                    <>
                        <div className='waitlist-modal-view'>
                            <div className='modal-title'>{`${this.props.animalType} Waitlist`}</div>
                            <hr />
                            <button className='close-cancel-modal' onClick={this.toggleWaitlistModal}>X</button>
                            <div className='waitlist-title-row'>
                                <div className='waitlist-title-item'>Date Scheduled</div>
                                <div className='waitlist-title-item'>Customer Name</div>
                                <div className='waitlist-title-item'>Customer Phone</div>
                                <div></div>
                                {displayWaitlist}
                            </div>
                        </div>
                    </>
                ) : (
                        null
                    )}

                <div key={this.props.id} className='schedule-item'>
                    {this.props.animalType}
                </div>
                <div className='schedule-item'>
                    {this.props.custName}
                </div>
                <div className='schedule-item'>
                    {this.props.custPhone}
                </div>
                <div className='schedule-item'>
                    {this.props.schedStatus}
                    <FaCheckCircle className='fa-icon'
                        onClick={this.confirm} />
                </div>
                <div className='schedule-item'>
                    {moment(this.props.statusChangeDate).format('l')}
                </div>
                <div className='schedule-item'>
                    <FaInfoCircle className='fa-icon-left'
                        onClick={this.toggleInfoModal} />
                    <FaTrashAlt className='fa-icon-left'
                        onClick={this.toggleCancelModal} />
                    <FaExchangeAlt className='fa-icon-left'
                        onClick={this.toggleWaitlistModal} />
                </div>
            </>
        )
    }
}