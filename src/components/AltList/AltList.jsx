import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';


import './AltList.css'
import DisplayAltList from './DisplayAltList';

export default class AltList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchAnimalType: '',
            altList: [],
            addModal: false,
            custName: '',
            animalType: '',
            numAnimals: '',
            custPhone: '',
            custNotes: '',
        }
    }

    async handleChange(key, value) {
        // console.log('handle Change')
        await this.setState({
            [key]: value.target.value
        })
        console.log(this.state)
    }

    getAltList = async () => {
        console.log('getAltList')
        let res = await axios.get(`/schedule/getAltList/${this.state.searchAnimalType}`)
        // console.log(res.data)
        await this.setState({
            altList:res.data
        })
        console.log(this.state)
    }

    addToAltList = async () => {
        console.log('Add to list')
        await axios.post('/schedule/addToAltList', {
            addDate: moment().format('l, h:mm:ss a'),
            animalType: this.state.animalType,
            totalAnimals: this.state.numAnimals,
            custName: this.state.custName,
            custPhone: this.state.custPhone,
            notes: this.state.notes
        })
        this.toggleAddModal();
    }

    toggleAddModal = async () => {
        // console.log(this.state.addModal)
        await this.setState({
            addModal: !this.state.addModal
        })
        if (this.state.addModal === false) {
            this.getAltList();
        }
    }

    removeFromList = async (id) => {
        console.log('remove from list')
        console.log(id)
        let searchAnimalType = this.state.searchAnimalType
        const res = await axios.put(`/schedule/removeFromAltList`, {id, searchAnimalType})
        await this.setState({
            altList:res.data
        })
    }

    editAltList = async (id) => {
        console.log('edit alt list')
        console.log(id)
    }

    render() {
        let displayAltList = this.state.altList.map(cust => {
            return(
                <DisplayAltList 
                    key = {cust.alt_id}
                    id = {cust.alt_id}
                    addedDate = {cust.added_date}
                    animalType = {cust.animal_type}
                    totalAnimals = {cust.totalAnimals}
                    custName = {cust.cust_name}
                    custPhone = {cust.cust_phone}
                    status = {cust.status}
                    notes = {cust.notes}
                    removeFromList = {this.removeFromList}
                    editAltList = {this.editAltList}
                />
            )
        })
        return (
            <div>
                {this.state.addModal ? (
                    <div className="schedule-view">
                        <button className='close-schedule-modal'
                            onClick={this.toggleAddModal}>X</button>
                        <div className='modal-title'>Add to Alternate List</div>
                        <hr />
                        <div className='schedule-form'>
                            <label className='form-label'>Animal Type: </label>
                            <select name='animal-type' id='animal-type'
                                className='search-select'
                                onChange={e => this.handleChange('animalType', e)}>
                                <option value=""></option>
                                <option value='Beef'>Beef</option>
                                <option value='Pork'>Pork</option>
                                <option value='Sheep'>Sheep</option>
                            </select>
                            <label className='form-label'>Number Animals: </label>
                            <input className='form-user-input'
                                onChange={e => this.handleChange("numAnimals", e)} />
                            <label className='form-label'>Customer Name: </label>
                            <input className='form-user-input' onChange={e => this.handleChange("custName", e)} />
                            <label className='form-label'>Customer Phone:</label>
                            <input className='form-user-input'
                                onChange={e => this.handleChange("custPhone", e)} />
                            <label className='form-label'>Schedule Notes:</label>
                            <input className='form-user-input'
                                onChange={e => this.handleChange("notes", e)} />
                            <div />
                            <button className='search-button'
                                onClick={() => this.addToAltList()}>Save</button>
                        </div>
                    </div>
                ) : (
                        null
                    )}

                <div className='al-search-bar'>
                    <div className='page-heading'>Alternate List</div>
                    <hr />
                    <div className='al-search-bar'>
                        <label className='form-label'>Animal Type: </label>
                        <select name='search-animal-type' id='search-animal-type'
                            className='search-select'
                            onChange={e => this.handleChange('searchAnimalType', e)}>
                            <option value=""></option>
                            <option value='Beef'>Beef</option>
                            <option value='Pork'>Pork</option>
                            <option value='Sheep'>Sheep</option>
                        </select>
                        <button className='search-button'
                            onClick={() => this.getAltList()}>Go</button>
                        <button className='search-button'
                            onClick={() => this.toggleAddModal()}>Add</button>
                    </div>
                    <hr />
                    <div className='altlist-title-row'>
                        <div className='altlist-title-item'>Date Added</div>
                        <div className='altlist-title-item'>Customer Name</div>
                        <div className='altlist-title-item'>Customer Phone</div>
                        <div className='altlist-title-item'>Notes</div>
                        <div className='altlist-title-item'> </div>
                            {displayAltList}
                    </div>
                </div>
            </div>
        )
    }

}