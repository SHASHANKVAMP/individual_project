const mongoose = require('mongoose');

const secSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  location: { type: String, required: true },
  camera: { type: String,required: true },
  access: { type: String, required: true },
});

const Device = mongoose.model('Security', secSchema, "Security");

module.exports = Device;
