const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  TotalTickets: { type: Number, required: true },
  available: { type: Number,required: true },
  eventId: { type: String, required: true },
  userId:{ type: String, required: true }
});

const counterData = mongoose.model('counter', counterSchema);
module.exports = counterData;
