import pendingVehicleModel from "../models/pendingVehicle.model.js"
import counterModel from "../models/counter.model.js"
import moment from "moment"
import PriceManager from "./prices.manager.js"
import reportModel from "../models/report.model.js"

const priceManager = new PriceManager()

export default class VehiclesManager {
  constructor() {
    this.dateTimeFormat = "YYYY-MM-DD HH:mm:ss"
  }

  getPendingVehicles = async () => {
    try {
      const vehicles = await pendingVehicleModel.find().lean().exec()
      return vehicles
    }
    catch (e) {
      console.log("Error:", e)
    }
  }

  getEstimatedPrice = async (id) => {
    try {
      const vehicle = await pendingVehicleModel.findOne({ $or: [{ pendingId: parseInt(id) || null }, { patent: id }] }).lean().exec()
      if (!vehicle) return { status: "error", payload: "Not found" }

      const { payload: prices } = await priceManager.getPricesOfVehicle(vehicle.vehicleType)
      if (!prices) return { status: "error", payload: "You have to enter the vehicles prices" }

      const entryDateTime = moment(vehicle?.entryDateTime)

      const now = moment()
      let difference = now.diff(entryDateTime, "minutes", true)
      const days = (difference - difference % (60 * 24)) / 60 / 24
      difference = difference - days * 24 * 60
      const hours = (difference - difference % 60) / 60
      difference = difference - hours * 60
      const minutes = difference
      const fractions = Math.ceil(minutes / 5)
      const total = days * prices.dayPrice + hours * prices.hourPrice + fractions * prices.fractionPrice
      const response = {
        status: "success",
        payload: {
          ...vehicle,
          total,
          exitDateTime: now.format(this.dateTimeFormat)
        }
      }

      return response
    }
    catch (e) {
      console.log("Error:", e)
      return false
    }
  }

  vehiclePayment = async (id) => {
    try {
      const insertValue = await this.getEstimatedPrice(id)
      if (!insertValue || insertValue?.status !== "success") return { statusNumber: 404, status: "error", payload: { paid: false } }
      const result = await reportModel.create(insertValue.payload)
      await pendingVehicleModel.deleteOne({ _id: insertValue.payload._id })
      return { statusNumber: 200, status: "success", payload: result }
    }
    catch (e) {
      console.log(e)
      return { statusNumber: 500, status: "error", payload: { paid: false } }
    }
  }

  insertNewVehicle = async (vehicleType, patent) => {
    try {
      const counter = await counterModel.findById({ _id: "pendingId" }).lean().exec()
      !counter && await counterModel.create({ _id: "pendingId", pendingId: 1 })
      const { pendingId } = await counterModel.findByIdAndUpdate("pendingId", { $inc: { pendingId: 1 } })

      const newVehicle = await pendingVehicleModel.create({ patent: patent || "", vehicleType, entryDateTime: moment().format(this.dateTimeFormat), pendingId })
      return newVehicle
    }
    catch (e) {
      console.log("Error:", e)
      return { statusNumber: 500, status: "error", payload: "Server error" }
    }
  }

  getPayments = async () => {
    try {
      const payments = await reportModel.find().lean().exec()
      return {statusNumber: 200, status: "success", payload: payments}
    }
    catch (e) {
      console.log("Error:", e)
      return { statusNumber: 500, status: "error", payload: "Server error" }
    }
  }

  getTotalOfPayments = async () => {
    try {
      const total = await reportModel.aggregate([{$group: {_id: null, total:{$sum:"$total"}}}])
      return {statusNumber: 200, status: "success", payload: total[0].total || 0}
    }
    catch (e) {
      console.log("Error:", e)
      return { statusNumber: 500, status: "error", payload: 0 }
    }
  }

  resetPayments = async () => {
    try {
      await reportModel.deleteMany({})
      return {statusNumber: 200, status: "success", payload: "Reseted"}
    }
    catch (e) {
      console.log("Error:", e)
      return { statusNumber: 500, status: "error", payload: "Server error" }
    }
  }
}