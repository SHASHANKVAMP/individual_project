const mongoose = require('mongoose');

const acSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String,required: true },
  temperature: { type: Number, required: true },
});

const Device = mongoose.model('Ac', acSchema,'Ac');

module.exports = Device;
