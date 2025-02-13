const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  details: { type: String, required: true },
  location: { type: String, required: true },
  totalTickets: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  poster: { type: String, required: true },
  userId: { type: String, required: true },
  approved: { type: Boolean, default: false },
});

const eventData = mongoose.model('event', eventSchema);
module.exports = eventData;
