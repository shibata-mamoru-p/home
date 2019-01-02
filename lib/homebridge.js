const axios = require('axios')

const BASE_URL = process.env.HOMEBRIDGE_BASE_URL
const PIN = process.env.HOMEBRIDGE_PIN

const TV_AID = 5
const TV_ON_IID = 10

const AC_AID = 4
const AC_STATE_IID = 14
const AC_STATE_VALUES = {
  off: 0,
  heat: 1,
  cool: 2
}

const AC_TEMPERATURE_IID = 16
const AC_MIN_TEMPERATURE = 10
const AC_MAX_TEMPERATURE = 30

function Homebridge() {
  this.client = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'authorization': PIN
    },
    responseType: 'json'
  })
}

Homebridge.prototype.toggleTv = function () {
  return this._toggleTvState()
}

Homebridge.prototype.turnOnHeater = function () {
  return this._setAcState('heat')
}

Homebridge.prototype.turnOnAc = function () {
  return this._setAcState('cool')
}

Homebridge.prototype.turnOffAc = function () {
  return this._setAcState('off')
}

Homebridge.prototype.setAcTemperature = function (value) {
  if (value < AC_MIN_TEMPERATURE || AC_MAX_TEMPERATURE < value) {
    return Promise.reject(new Error('Value is out of range'))
  }
  return this._setAcTemperature(value)
}

Homebridge.prototype._toggleTvState = function (value) {
  return this.client.put('/characteristics', {
    characteristics: [{
      aid: TV_AID,
      iid: TV_ON_IID,
      value: 1
    }]
  })
}

Homebridge.prototype._setAcState = function (value) {
  return this.client.put('/characteristics', {
    characteristics: [{
      aid: AC_AID,
      iid: AC_STATE_IID,
      value: AC_STATE_VALUES[value]
    }]
  })
}

Homebridge.prototype._setAcTemperature = function (value) {
  return this.client.put('/characteristics', {
    characteristics: [{
      aid: AC_AID,
      iid: AC_TEMPERATURE_IID,
      value: value
    }]
  })
}

module.exports = Homebridge
