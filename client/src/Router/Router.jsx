import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../pages/Home"
import Vehicles from "../pages/Vehicles"
import NewVehicle from "../pages/NewVehicle"
import VehiclePayment from "../pages/VehiclePayment"
import Prices from "../pages/Prices"
import Price from "../pages/Price"
import Report from "../pages/Report"

const Router = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/vehicles" element={<Vehicles/>}/>
        <Route path="/vehicles/new-vehicle" element={<NewVehicle/>}/>
        <Route path="/payment" element={<VehiclePayment/>}/> 
        <Route path="/prices" element={<Prices/>}/>
        <Route path="/prices/:vehicle" element={<Price/>}/>
        <Route path="/report" element={<Report/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router