import mongoose from "mongoose"

const reportCollection = "report"

const reportSchema = new mongoose.Schema({
  pendingId: Number,
  patent: {type: String, required: false},
  vehicleType: {type: String, enum: ["car", "van", "motorbike", "bike"]},
  entryDateTime: {type: String, required: true},
  exitDateTime: {type: String, required: true},
  total: Number
})

export default mongoose.model(reportCollection, reportSchema)