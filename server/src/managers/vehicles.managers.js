import pendingVehicleModel from "../models/pendingVehicle.model.js"
import counterModel from "../models/counter.model.js"
import moment from "moment"

export default class VehiclesManager {
  constructor() {
    this.dateTimeFormat = "YYYY-MM-DD HH:mm:ss"
    this.prices = {
      car: [50,600,2400],
      van: [100,1200,4800],
      bike: [5,60,240],
      motorbike: [5,60,240]
    }
  }

  getPendingVehicles = async () => {
    try {
      const vehicles = await pendingVehicleModel.find()
      return vehicles
    }
    catch(e) {
      console.log("Error:",e)
    }
  }

  getEstimatedPrice = async (id) => {
    try {
      const {entryDateTime} = await pendingVehicleModel.findOne({$or: [{pendingId: id}, {patent: id}]})
      if (!entryDateTime) return {status: "success", payload: "not found"}

      const now = moment()
      const difference = now.diff(entryDateTime, "minutes", true)

      const hours = (difference - difference%60) / 60
      const minutes = difference - hours * 60

      return {hours, minutes, fractions: Math.ceil(minutes / 5)}
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
    
      const newVehicle = await pendingVehicleModel.create({patent: patent || "", vehicleType, entryDateTime: moment().format(this.dateTimeFormat), pendingId})
      return newVehicle
    }
    catch(e) {
      console.log("Error:",e)
    }
  }
}