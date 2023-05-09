const mongoose = require('mongoose');

const lightSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String,required: true },
  color: { type: String, required: true },
});

const Device = mongoose.model('Light', lightSchema,'Light');

module.exports = Device;
