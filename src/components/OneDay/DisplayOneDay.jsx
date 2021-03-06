import React, { Component } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt, FaInfoCircle, FaExchangeAlt, FaCheckCircle } from 'react-icons/fa'

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
            editModal: false,
            custName: '',
            custPhone: '',
            schedStatus: '',
            notes: '',
            rescheduledFlag: false,
        }
    }

    toggleCancelModal = async () => {
        this.setState({
            cancelModal: !this.state.cancelModal,
            cancelledBy: ''
        })
    }

    toggleEditModal = async () => {
        // console.log(this.props.waitlistFlag)
        this.setState({
            editModal: !this.state.editModal,
            custName: this.props.custName,
            custPhone: this.props.custPhone,
            notes: this.props.notes,
            schedStatus: this.props.schedStatus,
            waitlistFlag: this.props.waitlistFlag
        })
        // console.log(this.state)
    }

    async toggleWaitlistFlag() {
        await this.setState({
            waitlistFlag: !this.state.waitlistFlag
        })
        // console.log(this.state)
    }


    toggleInfoModal = async () => {
        // console.log("info modal")
        this.setState({
            infoModal: !this.state.infoModal
        })
        // console.log(this.state.infoModal)
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
            // alert('You must cancel first')
            Swal.fire({
                title: 'You must cancel before filling from Waitlist',
                // text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Okay'
            })

        }
        if (this.state.waitlistModal === true) {
            await this.getWaitlist();
        } else {
            this.props.getScheduleById(this.props.slotId)
        }
        // console.log(this.state.waitlistModal)
    }

    getWaitlist = async () => {
        // console.log(this.props.schedDate)
        const res = await axios.get(`/schedule/get_waitlist/?schedDate=${this.props.schedDate}&animalType=${this.props.animalType}`)
        this.setState({
            waitList: res.data
        })
        // console.log(this.state)
    }


    async handleChange(key, value) {
        // console.log(key)
        this.setState({
            rescheduledFlag: false
        })
        // console.log(value.target.value)
        if (key === 'schedStatus'){
            // console.log('in status flag change')
            // console.log(value.target.value)
            if(this.props.schedStatus === 'Cancelled' &&
                value.target.value === 'Scheduled'){
                    // console.log('rescheduled')
                    this.setState({
                        rescheduledFlag: true
                    })
                }
        }
        else {
            // console.log('not sched status')
            // console.log(this.state.rescheduledFlag)
        }
        this.setState({
            [key]: value.target.value
        })
        // await console.log(this.state.schedStatus)
    }

    cancel = async () => {
        await this.props.cancelSchedule(this.props.id, this.state.cancelledBy)
        await this.toggleCancelModal()
    }

    update = async () => {
        // console.log('update customer')
        // console.log(this.state)
        // console.log(this.props)
        await this.props.updateCustomer(this.props.id, this.state.custName, this.state.custPhone, this.state.notes, this.state.waitlistFlag, this.state.schedStatus, this.state.rescheduledFlag, this.props.slotId)
        // console.log(res.data)
        this.toggleEditModal()
    }

    delete= async() => {
        this.props.deleteAppointment(this.props.id, this.props.slotId)
        this.toggleInfoModal();
    }

    confirm = async () => {
        // console.log('confirm')
        if (this.props.schedStatus === 'Scheduled') {
            await this.props.confirmSchedule(this.props.id)
        } else {
            // alert("You can only Confirm a Scheduled appointment")
            Swal.fire({
                title: 'You can only Confirm a Scheduled appointment',
                // text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Okay'
            })

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

                {this.state.editModal ? (
                    <div className='edit-modal-view'>
                        <button className='close-cancel-modal' onClick={this.toggleEditModal}>X</button>
                        <div className='edit-modal-container'>
                            <label className='form-label'>Customer Name: </label>
                            <input className='form-user-input' defaultValue={this.props.custName}
                                onChange={e => this.handleChange('custName', e)} />
                            <label className='form-label'>Phone Number: </label>
                            <input className='form-user-input' defaultValue={this.props.custPhone}
                                onChange={e => this.handleChange('custPhone', e)} />
                            <label className='form-label'>Waitlist:</label>
                            <input type="checkbox" className='form-checkbox'
                                checked={this.state.waitlistFlag}
                                onChange={e => this.toggleWaitlistFlag()} />
                            <label className='form-label'>Status: </label>
                            <select name='schedStatus' id='schedStatus' className='search-select' 
                                defaultValue={this.props.schedStatus}
                                onChange={e => this.handleChange('schedStatus', e)}>
                                <option value={this.props.schedStatus}>{this.props.schedStatus}</option>
                                <option value="Scheduled">Scheduled</option>
                                {/* <option value="Cancelled">Cancelled</option> */}
                            </select>
                            <label className='form-label'>Notes: </label>
                            <input className='form-user-input' defaultValue={this.props.notes}
                                onChange={e => this.handleChange('notes', e)} />
                            <div></div>
                            <button className='search-button'
                                onClick={this.update}>
                                Update
                            </button>

                        </div>
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
                            <hr/>
                            <div>
                                <button className='search-button'
                                    onClick={this.delete}>Delete
                                </button>
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
                                <div className='waitlist-title-item'>Notes</div>
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
                    {this.props.notes}
                </div>
                <div className='schedule-item'>
                    <FaInfoCircle className='fa-icon-left'
                        onClick={this.toggleInfoModal} />
                    <FaEdit className='fa-icon-left'
                        onClick={this.toggleEditModal} />
                    <FaTrashAlt className='fa-icon-left'
                        onClick={this.toggleCancelModal} />
                    <FaExchangeAlt className='fa-icon-left'
                        onClick={this.toggleWaitlistModal} />
                </div>
            </>
        )
    }
}