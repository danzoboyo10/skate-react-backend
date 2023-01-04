const mongoose = require('mongoose');

const bearingSchema = new mongoose.Schema({
    name: String,
    img: String,
    price: Number,
  });
  
  const Bearing = mongoose.models.Bearing || mongoose.model('Bearing', bearingSchema);

module.exports = Bearing;