import { Router } from "express"
import VehiclesManager from "../managers/vehicles.managers.js"

const router = Router()
const vehiclesManager = new VehiclesManager()

router.get("/payment/:id", async (req,res) => {
  try {
    const response = await vehiclesManager.vehiclePayment(req.params.id)
    res.status(response.statusNumber).json({status: response.status, payload: response.payload})
  }
  catch(e) {
    console.error(e)
    return res.status(500).json({status: "error", payload: e})
  }
})

router.get("/", async (req,res) => {
  try {
    const vehicles = await vehiclesManager.getPendingVehicles()
    res.json({status: "success", payload: vehicles})
  }
  catch(e) {
    console.error(e)
    return res.status(500).json({status: "error", payload: e})
  }
})

router.get("/report", async (req,res) => {
  try {
    const {payload: payments} = await vehiclesManager.getPayments()
    const {payload: total} = await vehiclesManager.getTotalOfPayments()
    
    
    res.json({status: "success", payload: {total, payments}})
  }
  catch(e) {
    console.error(e)
    return res.status(500).json({status: "error", payload: e})
  }
})

router.post("/", async (req,res) => {
  try {
    console.log("asdasd")
    const {patent, vehicleType} = req.body
    const newVehicle = await vehiclesManager.insertNewVehicle(vehicleType, patent.toUpperCase())
    res.json({status: "success", payload: newVehicle})
  }
  catch(e) {
    console.error(e)
    return res.status(500).json({status: "error", payload: e})
  }
})

export default router