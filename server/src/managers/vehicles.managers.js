import pendingVehicleModel from "../models/pendingVehicle.model.js"
import counterModel from "../models/counter.model.js"
import moment from "moment"

export default class VehiclesManager {
  constructor() {
    this.dateFormat = "YYYY-MM-DD"
    this.dateTimeFormat = "YYYY-MM-DD HH:mm:ss"
    this.prices = {
      car: [12.5,150,3600],
      van: [16.6,200,4800],
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
      const vehicle = await pendingVehicleModel.findOne({$or: [{pendingId: id}, {patent: id}]})
      if (!vehicle) return {status: "success", payload: "not found"}
      
      const entryDateTime = moment(vehicle?.entryDateTime)

      const now = moment()
      let difference = now.diff(entryDateTime, "minutes", true)

      const days = (difference - difference % (60 * 24)) / 60 / 24
      difference = difference-days*24*60

      const hours = (difference - difference % 60) / 60
      difference = difference - hours * 60

      const minutes = difference
      const fractions = Math.ceil(minutes / 5)

      const total = days * this.prices[vehicle.vehicleType][2] + hours * this.prices[vehicle.vehicleType][1] + fractions * this.prices[vehicle.vehicleType][0]

      const response = {
        total,
        days,hours,minutes
      }

      return response
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