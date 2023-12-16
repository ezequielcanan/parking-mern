import mongoose from "mongoose"

const pendingVehicleCollection = "pendingVehicles"

const pendingVehicleSchema = new mongoose.Schema({
  pendingId: Number,
  patent: {type: String, required: false},
  vehicleType: {type: String, enum: ["car", "van", "motorbike", "bike"]},
  entryDateTime: {type: String, required: true}
})

export default mongoose.model(pendingVehicleCollection, pendingVehicleSchema)