'use strict';

const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const hostname = '127.0.0.1';
const port = 3333;

const connectDB = require('./config/db.js');
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}`);
});

app.get('/', (req, res) => {
    res.send('API running');
});

const demoController = require('./routes/demoRoutes');

app.use('/demo', demoController);
