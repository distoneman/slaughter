import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './OneDay.css';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    async componentDidMount() {
        console.log('component did mount')
    }


    async handleChange(key, value) {
        // console.log(key)
        // console.log(value.target.value)
        // this.setState({
        //     [key]: value.target.value
        // })
        // console.log(this.state)
    }



    render() {
        return (
            <div>
                One day schedule
            </div>
        )
    }
}