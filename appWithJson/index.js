const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const data = require('./data.json');
app.use('/', express.static(path.join(__dirname, 'target')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/target/index.html'));
});
io.on('connection', function (socket) {
	socket.on("loadDataServer", () => {
		socket.emit('loadDataClient', JSON.stringify(data));
	});
});
server.listen(8081, () => {
    console.log('Server listen 8081 port');
});
