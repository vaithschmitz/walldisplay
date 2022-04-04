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

async function getWeather(){
  let weatherNextTwelveHours = []
  const res = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=51.534531&lon=0.025150&units=metric&exclude=minutely,alerts,current,daily&appid=6fb1f788f61e789641a1c8fc103e4a9b")
  const parsed = await res.json()
  for(let i = 0; i< 12; i++){
    let it = parsed.hourly[i]
    let date = new Date(it.dt * 1000)
    let hours = date.getUTCHours()
    let thisHourWeather = ""
    //map icons to weather data
    let weatherIcons = {
      '01d': 'f',
      '01n': 'f',
      '02d': 'g',
      '02n': 'g',
      '03d': 'b',
      '03n': 'b',
      '04d': 'a',
      '04n': 'a',
      '09d': 'd',
      '09n': 'd',
      '10d': 'h',
      '10n': 'h',
      '11d': 'i',
      '11n': 'i',
      '13d': 'e',
      '13n': 'e',
      '50d': 'c',
      '50n': 'c',
    }
    //build weatherString
    thisHourWeather += hours + " " + weatherIcons[it.weather[0].icon] + " "+ (Math.round(it.temp) + " " + it.weather[0].description.toUpperCase())
    weatherNextTwelveHours.push(thisHourWeather)
  }
  console.log(weatherNextTwelveHours)
  return weatherNextTwelveHours
}

// send data to client on schedule
cron.schedule('*/30 * * * * *', async () => {
  let weather = await getWeather()
  await io.emit('ping', weather)
})

