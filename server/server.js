const express = require('express');
const massive = require('massive');
// const moment = require('moment')
require('dotenv').config();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

app.use( express.static( `${__dirname}/../build` ) )

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

massive(CONNECTION_STRING).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err => console.log(err));

