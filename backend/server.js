const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);
const path = require('path');
const cron = require('node-cron')

// add public folder to serve static files
app.use("/public", express.static('public/'));

// set root to draw from as item in sibling folder
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: "frontend/"
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});



const rand = [
  "DEVELOPMENT",
  "DISTRICT",
  "DISTRIBUTOR",
  "PUNCH",
  "DISCIPLINE",
  "PARALLEL",
  "BATHROOM",
  "KORAN",
  "CONTROL",
  "PLUCK",
  "CELLAR",
  "BEAR",
  "BORDER",
  "ANGLE",
  "SPECIMEN",
  "", "", "", ""
]

function choice() {
  let options = Math.floor(Math.random() * 15)
  message = []
  for (let i = 0; i < options; i++) {
    message.push(rand[Math.floor(Math.random() * rand.length)])
  }
  return message
}
console.log(choice)
// function sendData()
cron.schedule('*/10 * * * * *', () => {
  io.emit('ping', choice())
})