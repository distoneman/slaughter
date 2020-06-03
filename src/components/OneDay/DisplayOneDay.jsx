import React, { Component } from 'react';
import moment from 'moment';
// import axios from 'axios';
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa'

import './OneDay.css';
// import axios from 'axios';

export default class DisplayOneDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelModal: false,
            cancelledBy: '',
            infoModal: false
        }
    }

    toggleCancelModal = async () => {
        await this.setState({
            cancelModal: !this.state.cancelModal,
            cancelledBy: ''
        })
    }

    toggleInfoModal = async () => {
        console.log("info modal")
        await this.setState({
            infoModal: !this.state.infoModal
        })
        console.log(this.state.infoModal)
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

    render() {
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
                </div>
                <div className='schedule-item'>
                    {moment(this.props.statusChangeDate).format('l')}
                </div>
                <div className='schedule-item'>
                    <FaInfoCircle className='fa-icon-left'
                        onClick={this.toggleInfoModal} />
                    <FaTrashAlt className='fa-icon-left'
                        onClick={this.toggleCancelModal} />
                    {/* // onClick = {e => this.props.cancelSchedule(this.props.id)} /> */}
                </div>
            </>
        )
    }
}