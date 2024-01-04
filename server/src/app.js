import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import vehiclesRouter from "./routes/vehicles.router.js"
import pricesRouter from "./routes/prices.router.js"
import cors from "cors"

dotenv.config()

const app = express()

app.use(cors({
  origin: "*"
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/vehicles", vehiclesRouter)
app.use("/api/prices", pricesRouter)

mongoose.connect(process.env.MONGODB_URI, {dbName: "parking"})
  .then(() => {
    app.listen(8080, () => console.log("Running on port 8080"))
  })
  .catch(console.error)