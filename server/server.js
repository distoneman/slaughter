const express = require('express');
const massive = require('massive');
// const moment = require('moment')
require('dotenv').config();
const settingsCtrl = require('./settingsController');
const scheduleCtrl = require('./scheduleController');
const searchCtrl = require('./searchController');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

app.use( express.static( `${__dirname}/../build` ) )

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

massive(CONNECTION_STRING).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err => console.log(err));

// SETTINGS
app.get('/settings/years/:animalType', settingsCtrl.years);
app.get('/settings/get_daily/:animalType&:year&:month', settingsCtrl.getDailyDetail)
app.get('/settings/getDefault/:animalType&:month', settingsCtrl.getMonthlyDefault)
app.post('/settings/addSlots' , settingsCtrl.addSlots);
app.get('/settings/get_day_slots/', settingsCtrl.getOneDaySlots);
app.put('/settings/update_slots', settingsCtrl.updateSlots);
app.get('/settings/getDefaultByMonth', settingsCtrl.getSlotDefaultByMonth);
app.put('/settings/updateDefaultSlots', settingsCtrl.updateDefaultSlots);

// SCHEDULE
app.get('/schedule/available_slots/:id', scheduleCtrl.getAvailable);
app.post('/schedule/addSchedule', scheduleCtrl.addSchedule);
app.get('/schedule/get_one_day/:id', scheduleCtrl.getOneDay);
app.get('/schedule/getScheduleByDate/', scheduleCtrl.getScheduleByDate);
app.put('/schedule/cancel', scheduleCtrl.cancelSched);
app.get('/schedule/get_waitlist/', scheduleCtrl.getWaitlist);
app.post('/schedule/fill_from_waitlst', scheduleCtrl.fillFromWaitlist);
app.put('/schedule/confirm', scheduleCtrl.updateConfirmedStatus);
app.get('/schedule/getSlotId/', scheduleCtrl.getSlotId);
app.put('/schedule/updateCustomer', scheduleCtrl.updateCustomer);
app.put('/schedule/deleteAppointment', scheduleCtrl.deleteAppointment);
app.post('/schedule/addToAltList', scheduleCtrl.addToAltList);
app.put('/schedule/removeFromAltList', scheduleCtrl.removeFromAltList);
app.get('/schedule/getAltList/', scheduleCtrl.getAltList)

// SEARCH
app.get('/search/by_name/:name', searchCtrl.getCustomerByName);
app.get('/search/by_phone/:phone', searchCtrl.getCustomerByPhone);
app.get('/search/by_status_date/', searchCtrl.getCustomerByStatusDate);