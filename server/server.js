const express = require('express');
const massive = require('massive');
// const moment = require('moment')
require('dotenv').config();
const settingsCtrl = require('./settingsController');
const scheduleCtrl = require('./scheduleController');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

app.use( express.static( `${__dirname}/../build` ) )

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

massive(CONNECTION_STRING).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err => console.log(err));

// SETTINGS
app.get('/settings/years/:animalType', settingsCtrl.years);
app.get('/settings/get_daily/:animalType&:year&:month', settingsCtrl.getDailyDetail)
app.get('/settings/getDefault/:animalType&:month', settingsCtrl.getMonthlyDefault)
app.post('/settings/addSlots' , settingsCtrl.addSlots);

// SCHEDULE
app.get('/schedule/available_slots/:id', scheduleCtrl.getAvailable);