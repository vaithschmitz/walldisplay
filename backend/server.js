import fetch from 'node-fetch';
import express from 'express';
const app = express();
import http from 'http'
const server = http.createServer(app);
import {Server} from 'socket.io'
const io = new Server(server);
import cron from 'node-cron'

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

async function getWeather(){
  const res = await fetch("https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=51.534531&lon=0.025150&cnt=12&appid=6fb1f788f61e789641a1c8fc103e4a9b")
  const parsed = await res.json()
  console.log(parsed)
}
getWeather()

// send data to client on schedule
// cron.schedule('*/10 * * * * *', () => {
//   io.emit('ping', choice())
// })

