const axios = require('axios')

const BASE_URL = process.env.HOMEBRIDGE_BASE_URL
const PIN = process.env.HOMEBRIDGE_PIN

const TV_AID = 5
const TV_ON_IID = 10

const AC_AID = 7
const AC_STATE_IID = 11
const AC_STATE_VALUES = {
  off: 0,
  on: 2
}
const AC_TEMPERATURE_IID = 13

const HEATER_AID = 8
const HEATER_STATE_IID = 11
const HEATER_STATE_VALUES = {
  off: 0,
  on: 1
}
const HEATER_TEMPERATURE_IID = 13

const MIN_TEMPERATURE = 10
const MAX_TEMPERATURE = 30

function Homebridge () {
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

Homebridge.prototype.turnOnAc = function () {
  return this._setAcState('on')
}

Homebridge.prototype.turnOffAc = function () {
  return this._setAcState('off')
}

Homebridge.prototype.turnOnHeater = function () {
  return this._setHeaterState('on')
}

Homebridge.prototype.turnOffHeater = function () {
  return this._setHeaterState('off')
}

Homebridge.prototype.setAcTemperature = function (value) {
  if (value < MIN_TEMPERATURE || MAX_TEMPERATURE < value) {
    return Promise.reject(new Error('Value is out of range'))
  }
  return this._setAcTemperature(value)
}

Homebridge.prototype.setHeaterTemperature = function (value) {
  if (value < MIN_TEMPERATURE || MAX_TEMPERATURE < value) {
    return Promise.reject(new Error('Value is out of range'))
  }
  return this._setHeaterTemperature(value)
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

Homebridge.prototype._setHeaterState = function (value) {
  return this.client.put('/characteristics', {
    characteristics: [{
      aid: HEATER_AID,
      iid: HEATER_STATE_IID,
      value: HEATER_STATE_VALUES[value]
    }]
  })
}

Homebridge.prototype._setHeaterTemperature = function (value) {
  return this.client.put('/characteristics', {
    characteristics: [{
      aid: HEATER_AID,
      iid: HEATER_TEMPERATURE_IID,
      value: value
    }]
  })
}

module.exports = Homebridge
