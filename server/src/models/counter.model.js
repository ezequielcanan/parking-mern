import mongoose from "mongoose"

const counterCollection = "counter"

const counterSchema = new mongoose.Schema({
  _id: String,
  pendingId: Number
})

export default mongoose.model(counterCollection, counterSchema)