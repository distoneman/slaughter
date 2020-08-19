import React, { Component } from 'react';
import moment from 'moment';
import { FaEdit } from 'react-icons/fa'

export default class DisplayCustomers extends Component {
    // constructor(props) {
    //     super(props) 


    // }

    render() {
        return (
            <>
                <div className='search-item' key={this.props.id}>
                    {this.props.custName}
                    <FaEdit className='fa-icon-right'
                        onClick={this.toggleEditModal} />

                </div>
                <div className='search-item'>{this.props.animalType}</div>
                <div className='search-item'>{this.props.phone}</div>
                <div className='search-item'>
                    {moment(this.props.schedDate).utc().format('l')}
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