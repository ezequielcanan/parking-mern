import pendingVehicleModel from "../models/pendingVehicle.model.js"
import counterModel from "../models/counter.model.js"
import moment from "moment"

export default class VehiclesManager {
  constructor() {}

  getPendingVehicles = async () => {
    try {
      const vehicles = await pendingVehicleModel.find()
      return vehicles
    }
    catch(e) {
      console.log("Error:",e)
    }
  }
  
  insertNewVehicle = async (vehicleType, patent) => {
    try {
      const counter = await counterModel.findById({_id: "pendingId"})
      !counter && await counterModel.create({_id: "pendingId", pendingId: 1})  
      const {pendingId} = await counterModel.findByIdAndUpdate("pendingId", {$inc: {pendingId: 1}})
    
      const newVehicle = await pendingVehicleModel.create({patent: patent || "", vehicleType, entryDateTime: moment().format("YYYY-MM-DD hh:mm:ss"), pendingId})
      return newVehicle
    }
    catch(e) {
      console.log("Error:",e)
    }
  }
}