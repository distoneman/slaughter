import React, { Component } from 'react'
import moment from 'moment'

import './AltList.css';
import { FaTrashAlt, FaEdit} from 'react-icons/fa';

export default class DisplayAltList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div key={this.props.id} className='altlist-item'>
                    {moment(this.props.addedDate).format('l')}
                </div>
                <div className='altlist-item'>
                    {this.props.custName}
                </div>
                <div className='altlist-item'>
                    {this.props.custPhone}
                </div>
                <div className='altlist-item'>
                    {this.props.notes}
                </div>
                <div className='altlist-item'>
                    <FaEdit className = 'fa-icon-left' 
                        onClick = {() => this.props.editAltList(this.props.id)}/>
                    <FaTrashAlt className='fa-icon-left' 
                        onClick={() => this.props.removeFromList(this.props.id)}/>
                </div>
            </>
        )
    }
}

// () => this.props.deleteInvoice(this.props.id)