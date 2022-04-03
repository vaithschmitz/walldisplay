const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');


app.use("/public", express.static('../public/'));


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: "../frontend/"});
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// frontend/index.html

// /Users/vaithschmitz/Desktop/Code/walldisplay/frontend/index.html