import React, { Component } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

import './Settings.css'

export default class DisplayDefaults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editSlotsModal: false,
            maxSlots: 0
        }
    }

    async handleChange(key, value) {
        this.setState({
            [key]: value.target.value

        })
        // console.log(this.state)
    }

    toggleEditSlotsModal = async () => {
        await this.setState({
            maxSlots: this.props.maxSlots,
            editSlotsModal: !this.state.editSlotsModal,
        })
        // await console.log(this.state)
    }

    updateSlots = async () => {
        // console.log('update slots')
        // console.log(this.state.maxSlots)
        // console.log(this.props.id)
        await axios.put('/settings/updateDefaultSlots',
            {
                id: this.props.id,
                maxSlots: this.state.maxSlots
            })
        await this.props.getDefaultSlotsValues();
        await this.toggleEditSlotsModal();
    }


    render() {
        return (
            <>
                {this.state.editSlotsModal ? (
                    <div className='edit-modal-view'>
                        <button className='close-cancel-modal' onClick={this.toggleEditSlotsModal}>X</button>
                        <label className='form-label'>Max Slots: </label>
                        <input className='form-user-input' value={this.state.maxSlots}
                            onChange={e => this.handleChange('maxSlots', e)} />
                        <button className='search-button'
                            onClick={this.updateSlots}>
                            Update
                        </button>
                    </div>
                ) : (
                        null
                    )}


                <div className='monthly-slots-item' key={this.props.id}>
                    {this.props.killMonth}
                </div>
                <div className='monthly-slots-item'>{this.props.animalType}</div>
                <div className='monthly-slots-item'>{this.props.maxSlots}
                    <FaEdit className='fa-icon' onClick={this.toggleEditSlotsModal} />
                </div>
            </>
        )
    }
}