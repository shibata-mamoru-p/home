'use strict'

const mqtt = require('mqtt')
const Ps4 = require('./lib/ps4')
const Homebridge = require('./lib/homebridge')

const CHANNEL_TOKEN = process.env.BEEBOTTE_CHANNEL_TOKEN_HOME

const client = mqtt.connect('mqtt://mqtt.beebotte.com',
  { username: `token:${CHANNEL_TOKEN}`, password: '' }
)

const homebridge = new Homebridge()
const ps4 = new Ps4()

client.on('message', function (topic, message) {
  let phrase = JSON.parse(message).data

  switch (topic) {
    case 'home/ps4':
      if (/つけ|オン/.test(phrase)) {
        ps4.turnOn()
          .catch((e) => console.log(e))
      } else if (/消し|けし|オフ/.test(phrase)) {
        ps4.turnOff()
          .catch((e) => console.log(e))
      }

      break
    case 'home/torne':
      if (/つけ|オン/.test(phrase)) {
        ps4.startTorne()
          .catch((e) => console.log(e))
      } else if (/消し|けし|オフ/.test(phrase)) {
        ps4.turnOff()
          .catch((e) => console.log(e))
      }

      break
    case 'home/tv':
      homebridge.toggleTv()
        .catch((e) => console.log(e))

      break
    case 'home/ac':
      if (/つけ|オン/.test(phrase)) {
        homebridge.turnOnAc()
          .catch((e) => console.log(e))
      } else if (/消し|けし|オフ/.test(phrase)) {
        homebridge.turnOffAc()
          .catch((e) => console.log(e))
      }

      break
    case 'home/heater':
      if (/つけ|オン/.test(phrase)) {
        homebridge.turnOnHeater()
          .catch((e) => console.log(e))
      } else if (/消し|けし|オフ/.test(phrase)) {
        homebridge.turnOffHeater()
          .catch((e) => console.log(e))
      }

      break
  }
})

client.subscribe('home/+')
