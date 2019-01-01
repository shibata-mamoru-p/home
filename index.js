const mqtt = require('mqtt')
const {Device} = require('ps4-waker')

const CHANNEL_TOKEN = process.env.BEEBOTTE_CHANNEL_TOKEN_HOME
const TITLE_ID_TORNE = 'CUSA00442'

client =  mqtt.connect('mqtt://mqtt.beebotte.com',
  {username: `token:${CHANNEL_TOKEN}`, password: ''}
)

client.on('message', function (topic, message) {
  let phrase = JSON.parse(message).data

  switch (topic) {
    case 'home/ps4':
      var ps4 = new Device()

      if (/つけ|オン/.test(phrase)) {
        ps4.turnOn().then(() => ps4.close())
      } else if (/消し|けし|オフ/.test(phrase)) {
        ps4.turnOff().then(() => ps4.close())
      }

      break
    case 'home/torne':
      var ps4 = new Device()

      if (/つけ|オン/.test(phrase)) {
        ps4.startTitle(TITLE_ID_TORNE).then(() => ps4.close())
      } else if (/消し|けし|オフ/.test(phrase)) {
        ps4.turnOff().then(() => ps4.close())
      }

      break
  }
})

client.subscribe('home/+')
