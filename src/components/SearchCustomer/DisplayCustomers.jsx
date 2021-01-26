import React, { Component } from 'react';
import moment from 'moment';
import { FaEdit } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default class DisplayCustomers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            custName: '',
            custPhone: '',
            notes: '',
            waitlistFlag: this.props.waitlistFlag
        }
    }

    async handleChange(key, value) {
        // console.log(key)
        // console.log(value.target.value)
        this.setState({
            [key]: value.target.value
        })
        // await console.log(this.state.custName)
    }

    toggleEditModal = async () => {
        // console.log(this.props.schedStatus)
        await this.setState({
            editModal: !this.state.editModal,
            custName: this.props.custName,
            custPhone: this.props.custPhone,
            notes: this.props.notes,
            schedStatus: this.props.schedStatus,
            waitlistFlag: this.props.waitlistFlag
        })
        console.log(this.state)
    }

    async toggleWaitlistFlag() {
        await this.setState({
            waitlistFlag: !this.state.waitlistFlag
        })
        // console.log(this.state.waitlistFlag)
    }

    update = async () => {
        // console.log('update customer')
        // console.log(this.state)
        // console.log(this.props)
        await this.props.updateCustomer(this.props.id, this.state.custName, this.state.custPhone, this.state.notes, this.state.waitlistFlag, this.props.schedStatus)
        // console.log(res.data)
        this.toggleEditModal()
    }


    render() {
        return (
            <>

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

                <div className='search-item' key={this.props.id}>
                    {this.props.custName}
                    <FaEdit className='fa-icon-right'
                        onClick={this.toggleEditModal} />

                </div>
                <div className='search-item'>{this.props.animalType}</div>
                <div className='search-item'>{this.props.phone}</div>
                <div className='search-item'>
                    <Link to={`/oneday/${this.props.slotId}`}>
                        {moment(this.props.schedDate).utc().format('l')}
                    </Link>
                </div>
                <div className='search-item'>{this.props.schedStatus}</div>
                <div className='search-item'>
                    {moment(this.props.statusDate).utc().format('l')}
                </div>
                <div className='search-item'>{this.props.waitList}</div>
                <div className='search-item'>{this.props.notes}</div>
            </>
        )
    }
}