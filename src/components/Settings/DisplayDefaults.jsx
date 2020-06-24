import React, { Component } from 'react';
import {FaEdit} from 'react-icons/fa';

import './Settings.css'

export default class DisplayDefaults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editSlotsModal: false,
        }
    }

    toggleEditSlotsModal = async () => {
        this.setState({
            editSlotsModal: !this.state.editSlotsModal,
        })
    }



    render() {
        return (
            <>
                <div className='monthly-slots-item' key={this.props.id}>
                    {this.props.killMonth}
                </div>
                <div className='monthly-slots-item'>{this.props.animalType}</div>
                <div className='monthly-slots-item'>{this.props.maxSlots}
                    <FaEdit className='fa-icon'/>
                </div>
            </>
        )
    }
}