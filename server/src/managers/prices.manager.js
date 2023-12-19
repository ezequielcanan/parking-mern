import pricesModel from "../models/prices.model.js"

export default class PriceManager {
  constructor() {}
  
  getPrices = async () => {
    try {
      const prices = await pricesModel.find()
      return {statusNumber: 200, status: "success", payload: prices}
    }
    catch (e) {
      console.log("Error",e)
      return {statusNumber: 500, status: "Error", payload: e}
    }
  }

  getPricesOfVehicle = async (vehicle) => {
    try {
      const price = await pricesModel.findOne({vehicle})
      return {statusNumber: price ? 200 : 404, status: "success", payload: price}
    }
    catch (e) {
      console.log("Error",e)
      return {statusNumber: 500, status: "Error", payload: e}
    }
  }

  createVehiclePrice = async ({hourPrice, dayPrice, fractionPrice, vehicle}) => {
    try {
      const newPrice = await pricesModel.create({vehicle, hourPrice, fractionPrice, dayPrice})
      return {statusNumber: 200, status: "success", payload: newPrice}
    }
    catch (e) {
      console.log("Error",e)
      return {statusNumber: 500, status: "Error", payload: e}
    }
  }

  updateVehiclePrice = async ({hourPrice, dayPrice, fractionPrice, vehicle}) => {
    try {
      const updatedPrice = await pricesModel.updateOne({vehicle}, {hourPrice, dayPrice, fractionPrice})
      if (!updatedPrice.modifiedCount) return {statusNumber: 404, status: "Error", payload: updatedPrice}

      return {statusNumber: 200, status: "success", payload: updatedPrice}
    }
    catch (e) {
      console.log("Error",e)
      return {statusNumber: 500, status: "Error", payload: e}
    }
  }
}