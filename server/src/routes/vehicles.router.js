import { Router } from "express"
import VehiclesManager from "../managers/vehicles.managers.js"

const router = Router()
const vehiclesManager = new VehiclesManager()

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

router.post("/", async (req,res) => {
  try {
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