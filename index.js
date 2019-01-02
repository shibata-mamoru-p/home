'use strict'

const mqtt = require('mqtt')
const {Device} = require('ps4-waker')
const Homebridge = require('./lib/homebridge')

const CHANNEL_TOKEN = process.env.BEEBOTTE_CHANNEL_TOKEN_HOME
const TITLE_ID_TORNE = 'CUSA00442'

const client = mqtt.connect('mqtt://mqtt.beebotte.com',
  {username: `token:${CHANNEL_TOKEN}`, password: ''}
)

const homebridge = new Homebridge()

client.on('message', function (topic, message) {
  let phrase = JSON.parse(message).data

  switch (topic) {
    case 'home/ps4':
      var ps4 = new Device()

      if (/つけ|オン/.test(phrase)) {
        ps4.turnOn()
          .then(() => ps4.close())
          .catch((e) => console.log(e))
      } else if (/消し|けし|オフ/.test(phrase)) {
        ps4.turnOff()
          .then(() => ps4.close())
          .catch((e) => console.log(e))
      }

      break
    case 'home/torne':
      var ps4 = new Device()

      if (/つけ|オン/.test(phrase)) {
        ps4.startTitle(TITLE_ID_TORNE)
          .then(() => ps4.close())
          .catch((e) => console.log(e))
      } else if (/消し|けし|オフ/.test(phrase)) {
        ps4.turnOff()
          .then(() => ps4.close())
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
        homebridge.turnOffAc()
          .catch((e) => console.log(e))
      }

      break
  }
})

client.subscribe('home/+')
