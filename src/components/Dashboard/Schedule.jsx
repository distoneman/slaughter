import React, { Component } from 'react';
import axios from 'axios';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    async componentDidMount() {
        // console.log(this.props.searchType)
        // let res = await axios.get(`/search/${this.props.searchType}ID/${this.props.id}`)
        // this.setState({
            // invoice: res.data[0]
        // })
        // console.log(this.state)
    }

    render() {
        return (
            <div>
                Schedule
           </div>
        )
    }
}