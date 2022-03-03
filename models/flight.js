import mongoose from "mongoose";
const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0,
  }
})

const flightSchema = new Schema ({
  airline: { 
    type: String,
    enum: ["American Airlines", "Southwest Airlines", "United Airlines"],
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    default: "DEN"
  },
  flightNo: {
    type: Number,
    required: true, 
    min: 10, 
    max: 9999
  },
  departs: {
    type: Date,
    default: Date.now() + 365*24*60*60000
  },
  tickets: [ticketSchema]
}
)

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight
}