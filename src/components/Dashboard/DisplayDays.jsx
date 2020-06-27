import React, { Component } from 'react';
// import { Link } from "react-router-dom";
// import { IoIosMail, IoIosText } from "react-icons/io";
import { FaCalendarPlus, FaClipboardList, FaEdit } from 'react-icons/fa';
import Schedule from './Schedule';
import moment from 'moment';
import { Link } from "react-router-dom";


import './Dashboard.css'
import axios from 'axios';

export default class DisplayDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleModal: false,
            editSlotsModal: false,
            slots: [],
            BeefId: null,
            BeefMax: 0,
            BeefUsed: 0,
            PorkId: null,
            PorkMax: 0,
            PorkUsed: 0,
            SheepId: null,
            SheepMax: 0,
            SheepUsed: 0
        }
    }

    toggleSchedule = async () => {
        await this.setState({
            scheduleModal: !this.state.scheduleModal
        })
        if (this.state.scheduleModal === false) {
            this.props.getDailyDetail();
        }
    }

    toggleEditSlots = async () => {
        // console.log('toggle edit slots')
        await this.setState({
            editSlotsModal: !this.state.editSlotsModal
        })
        // await console.log(this.state.editSlotsModal)
        if (this.state.editSlotsModal === true) {
            this.getOneDaySlots();
        }
    }

    async handleChange(key, value) {
        this.setState({
            [key]: value.target.value
        })
        // console.log(this.state)
    }


    updateSlots = async () => {
        // console.log('update slots')
        await axios.put(`/settings/update_slots`, {
            beefId: this.state.BeefId,
            beefMax: this.state.BeefMax,
            porkId: this.state.PorkId,
            porkMax: this.state.PorkMax,
            sheepId: this.state.SheepId,
            sheepMax: this.state.SheepMax
        })
        this.toggleEditSlots();
        this.props.getDailyDetail();
    }

    getOneDaySlots = async () => {
        // console.log('get one day slots')
        // console.log(this.props)
        let schedDate = moment(this.props.slot_date).format('l')
        // console.log(schedDate)
        const res = await axios.get(`/settings/get_day_slots/?schedDate=${schedDate}`)
        // console.log(res.data)
        this.setState({
            slots: res.data
        })

        for (let i = 0; i < this.state.slots.length; i++) {
            // console.log(this.state.slots[i].animal_type)
            // console.log(this.state.slots[i].max_slots)
            // console.log(this.state.slots[i].used_slots)
            let maxKey = this.state.slots[i].animal_type + 'Max'
            let usedKey = this.state.slots[i].animal_type + 'Used'
            let idKey = this.state.slots[i].animal_type + 'Id'
            this.setState({
                [maxKey]: this.state.slots[i].max_slots,
                [usedKey]: this.state.slots[i].used_slots,
                [idKey]: this.state.slots[i].id
            })
        }
        // console.log(this.state)
    }



    render() {

        return (
            <>
                {this.state.scheduleModal ? (
                    <div className="schedule-view">
                        <button className='close-schedule-modal' onClick={this.toggleSchedule}>X</button>
                        <Schedule
                            //  searchType={this.props.searchType}
                            id={this.props.id}
                            toggleSchedule={this.toggleSchedule}
                            scheduleDate={this.props.fDate}
                        />
                    </div>
                ) : (
                        null
                    )}

                {this.state.editSlotsModal ? (
                    <div className="edit-slots-view">
                        <button className='close-edit-slots-modal' onClick={this.toggleEditSlots}>X</button>
                        <div className='modal-title'>{moment(this.props.slot_date).format("dddd, MMM Do YYYY")}</div>
                        <hr/>
                        <div className='edit-slots-table'>
                            <div></div>
                            <div className='edit-slots-title'>Max Slots</div>
                            <div className='edit-slots-title'>Used Slots</div>
                            <label className='form-label'>Beef</label>
                            <div className='edit-slots-item'>
                                <input value={this.state.BeefMax} className='form-user-input-short'
                                    onChange={e => this.handleChange('BeefMax', e)} />
                            </div>
                            <div className='edit-slots-used'>{this.state.BeefUsed}</div>
                            <label className='form-label'>Pork</label>
                            <div className='edit-slots-item'>
                                <input value={this.state.PorkMax} className='form-user-input-short'
                                    onChange={e => this.handleChange('PorkMax', e)} />
                            </div>
                            <div className='edit-slots-used'>{this.state.PorkUsed}</div>
                            <label className='form-label'>Sheep</label>
                            <div className='edit-slots-item'>
                                <input value={this.state.SheepMax} className='form-user-input-short'
                                    onChange={e => this.handleChange('SheepMax', e)} />
                            </div>
                            <div className='edit-slots-used'>{this.state.SheepUsed}</div>
                            <div/>
                            <div/>
                            <button className='slots-save-button'
                                onClick={this.updateSlots}>Save</button>
                        </div>
                    </div>
                ) : (
                        null
                    )
                }

                <div className='search-item' key={this.props.id}>{moment(this.props.slot_date).utc().format('dddd, MMM Do YYYY')}
                    <Link to={`/oneday/${this.props.id}`}>
                        <FaClipboardList className='fa-icon' />
                    </Link>
                </div>
                <div className='search-item'>{this.props.animal_type}</div>
                <div className='search-item'>{this.props.available_slots} / {this.props.max_slots}
                    <FaCalendarPlus className='fa-icon' onClick={this.toggleSchedule} />
                </div>
                <div className='search-item'>Edit Slots
                    <FaEdit className='fa-icon' onClick={this.toggleEditSlots} />
                </div>
            </>
        )
    }
}