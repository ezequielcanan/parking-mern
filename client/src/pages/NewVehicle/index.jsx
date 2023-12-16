import { useEffect,useState } from "react"
import gsap from "gsap"

const NewVehicle = () => {
  const [selectedVehicle, setSelectedVehicle] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {patent: e.currentTarget.patent.value, vehicleType: selectedVehicle}
    const result = await fetch("http://localhost:8080/api/vehicles", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)})
    const newVehicle = await result.json()

    gsap.set(".vehicle-on-firstrace", {display: "none", right: "80%"})
    gsap.set(".vehicle-on-race", {display: "block", right: "80%"})
    gsap.to(".vehicle-on-race", {right: -180, duration: .5, onComplete: () => gsap.set(".vehicle-on-race", {right: "80%", display: "none"}, gsap.to(".vehicle-on-firstrace", {right: 20, display: "block", duration: .5}))})
  }

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle)
    gsap.set(".vehicle-on-race", {display: "none"})
    gsap.set(".vehicle-on-firstrace", {right: "80%", display: "block"})
    gsap.to(".vehicle-on-firstrace", {right: 20, duration: .5})
  }

  useEffect(() => {
    handleVehicleClick("car")
  }, [])

  return (
    <main className="flex flex-col items-center bg-secondary gap-y-[80px] pt-[200px] pb-[70px] overflow-hidden">
      <h2 className="text-5xl text-third font-semibold">Enter new vehicle:</h2>
      <div className="w-full flex justify-around items-center">
        <img src="/multimedia/images/van.png" className={`w-[15%] vehicle-image duration-300 ${selectedVehicle == "van" ? "selected" : ""}`} alt="" onClick={() => handleVehicleClick("van")}/>
        <img src="/multimedia/images/car.png" className={`w-[14%] vehicle-image duration-300 ${selectedVehicle == "car" ? "selected" : ""}`} alt="" onClick={() => handleVehicleClick("car")}/>
        <img src="/multimedia/images/motorbike.png" className={`w-[10%] vehicle-image duration-300 ${selectedVehicle == "motorbike" ? "selected" : ""}`} alt="" onClick={() => handleVehicleClick("motorbike")}/>
        <img src="/multimedia/images/bike.png" className={`w-1/12 vehicle-image duration-300 ${selectedVehicle == "bike" ? "selected" : ""}`} alt="" onClick={() => handleVehicleClick("bike")}/>
      </div>
      <div className="flex flex-col items-center w-[1950px] relative">
        <form onSubmit={handleSubmit} className="flex flex-col items-center mb-[30px] gap-y-[30px]">
          <input type="text" placeholder="Patente (opcional)" name="patent" className="border-4 rounded border-third p-3 text-4xl text-center uppercase placeholder:text-xl placeholder:normal-case w-[200px] h-[70px] font-bold"/>
          <button className="px-5 py-2 bg-third text-center text-2xl rounded font-bold" type="submit">Enter</button>
        </form>
        <div className="absolute bottom-0 left-0 w-[40%] h-full">
          <img src="/multimedia/images/race.png" alt="" className="absolute w-full h-[250px] bottom-0 right-0 -z-1"/>
          <img src={`/multimedia/images/${selectedVehicle}.png`} alt="" className={`absolute w-[18%] bottom-[34%] right-[80%] opacity-100 selected vehicle-on-firstrace`}/>
        </div>
        <div className="absolute bottom-0 right-0 w-[40%] h-full">
          <img src="/multimedia/images/race.png" alt="" className="absolute w-full h-[250px] bottom-0 left-0 -z-1"/>
          <img src={`/multimedia/images/${selectedVehicle}.png`} alt="" className={`absolute w-[18%] bottom-[34%] right-[80%] opacity-100 selected vehicle-on-race hidden`}/>
        </div>
      </div>
    </main>
  )
}

export default NewVehicle