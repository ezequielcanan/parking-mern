import mongoose from "mongoose"

const pricesCollection = "prices"
const pricesSchema = new mongoose.Schema({
  vehicle: {type: String, unique: true},
  dayPrice: Number,
  hourPrice: Number,
  fractionPrice: Number
})

export default mongoose.model(pricesCollection, pricesSchema)