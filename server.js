'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3333;

const express = require('express');

const app = express();

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}`);
});

app.get('/', (req, res) => {
    res.send('API running');
});
