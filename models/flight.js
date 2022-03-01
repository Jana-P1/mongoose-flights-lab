import mongoose from "mongoose";
const Schema = mongoose.Schema

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
    default: function() {
      return new Date().now + 365*24*60*60000
  },
}
})

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight
}