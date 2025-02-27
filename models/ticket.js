const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: { type: String, ref: "user" },
  dateOfTravel: { type: Date.now },
  modeOfTravel: { enum: ["rail", "bus"] },
  perHeadPrice: { type: Number },
  from: { type: String },
  to: { type: String },
  numberOfPassengers: { type: Number },
  totalPrice: { type: Number },
});
const TicketModel=mongoose.model('ticket',ticketSchema);
module.exports=TicketModel;