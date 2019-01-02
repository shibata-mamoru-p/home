const { Device } = require('ps4-waker')

const ADDRESS = process.env.PS4_ADDRESS
const TITLE_ID_TORNE = 'CUSA00442'

const option = ADDRESS ? { address: ADDRESS } : {}

function Ps4 () {
  this.device = new Device(option)
}

Ps4.prototype.turnOn = function () {
  return this.device.turnOn().then(() => this.device.close())
}

Ps4.prototype.turnOff = function () {
  return this.device.turnOff().then(() => this.device.close())
}

Ps4.prototype.startTorne = function () {
  return this.device.startTitle(TITLE_ID_TORNE).then(() => this.device.close())
}

module.exports = Ps4
