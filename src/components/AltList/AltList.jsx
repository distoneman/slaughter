import React, {Component} from 'react';
import axios from 'axios';

import './AltList.css'

export default class AltList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animalType: '',
            altList: [],
            addModal: false,
        }
    }

    async handleChange(key, value) {
        // console.log('handle Change')
        await this.setState({
            [key]: value.target.value
        })
        // console.log(this.state)
    }

    getAltList = async () => {
        console.log('getAltList')
    }

    addToAltList = async () => {
        console.log('Add to list')
    }

    render() {
        return (
            <div>
                <div className = 'al-search-bar'>
                    <label className = 'form-label'>Animal Type: </label>
                    <select name = 'animal-type' id = 'animal-type'
                        className = 'search-select'
                        onChange = {e => this.handleChange('animalType', e)}>
                        <option value=""></option>
                        <option value='Beef'>Beef</option>
                        <option value='Pork'>Pork</option>
                        <option value='Sheep'>Sheep</option>
                    </select>
                    <button className='search-button'
                        onClick={() => this.getAltList()}>Go</button>
                    <button className='search-button'
                        onClick={() => this.addToAltList()}>Add</button>
                </div>
                <hr />
                <div className='waitlist-title-row'>
                    <div className='waitlist-title-item'>Date Added</div>
                    <div className='waitlist-title-item'>Customer Name</div>
                    <div className='waitlist-title-item'>Customer Phone</div>
                    <div className='waitlist-title-item'>Notes</div>
                </div>
            </div>
        )
    }

}