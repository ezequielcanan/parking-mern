import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../pages/Home"
import Vehicles from "../pages/Vehicles"
import NewVehicle from "../pages/NewVehicle"

const Router = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/vehicles" element={<Vehicles/>}/>
        <Route path="/vehicles/new-vehicle" element={<NewVehicle/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router