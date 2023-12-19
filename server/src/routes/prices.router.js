import { Router } from "express"
import PriceManager from "../managers/prices.manager.js"

const priceManager = new PriceManager()

const router = Router()

router.get("/", async (req, res) => {
  try {
    const { statusNumber, status, payload } = await priceManager.getPrices()
    res.status(statusNumber).json({ status, payload })
  }
  catch (e) {
    console.log("Error,", e)
    res.status(500).send("Internal server error")
  }
})

router.get("/:vehicle", async (req, res) => {
  try {
    const { statusNumber, status, payload } = await priceManager.getPricesOfVehicle(req?.params?.vehicle)
    res.status(statusNumber).json({ status, payload })
  }
  catch (e) {
    console.log("Error,", e)
    res.status(500).send("Internal server error")
  }
})

router.post("/:vehicle", async (req, res) => {
  try {
    const { params: { vehicle }, body: { hourPrice, dayPrice, fractionPrice } } = req
    const { payload: exists } = await priceManager.getPricesOfVehicle(req?.params?.vehicle)
    if (!exists) {
      const { statusNumber, status, payload } = await priceManager.createVehiclePrice({ hourPrice: Number(hourPrice), dayPrice: Number(dayPrice), fractionPrice: Number(fractionPrice), vehicle })
      payload.updated = true
      return res.status(statusNumber).json({ status, payload })
    }
    const { statusNumber, status, payload } = await priceManager.updateVehiclePrice({ hourPrice: Number(hourPrice), dayPrice: Number(dayPrice), fractionPrice: Number(fractionPrice), vehicle })
    payload.updated = true
    return res.status(statusNumber).json({ status, payload })
  }
  catch (e) {
    console.log("Error,", e)
    res.status(500).send("Internal server error")
  }
})

export default router