import { useEffect, useState } from "react"
import gsap from "gsap"

const NewVehicle = () => {
  const [selectedVehicle, setSelectedVehicle] = useState()
  const [inserting, setInserting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setInserting(true)
    const button = e.currentTarget.submit
    button.disabled = true
    const body = { patent: e.currentTarget.patent.value, vehicleType: selectedVehicle }
    e.currentTarget.reset()
    const result = await fetch("http://localhost:8080/api/vehicles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    const newVehicle = await result.json()
    gsap.set(".insertingState", { marginLeft: 205, marginBottom: 55, duration: 0 })
    gsap.to(".vehicle-on-street", { position: "absolute", left: "620%", bottom: "7%", duration: 1, onComplete: () => gsap.set(".vehicle-on-street", { position: "static", left: 0, onComplete: () => (gsap.set(".insertingState", { marginLeft: 0, marginBottom: 0, duration: 0 }), button.disabled = false, setInserting(false)) }) })
  }

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle)
  }

  useEffect(() => {
    handleVehicleClick("car")
  }, [])

  return (
    <main className="flex flex-col items-center bg-secondary gap-y-[20px] pt-[200px] pb-[70px] min-h-screen overflow-hidden">
      <h2 className="text-5xl text-third font-semibold">Enter new vehicle:</h2>
      <div className="w-full flex justify-around items-center">
        <img src="/multimedia/images/van.png" className={`w-[15%] vehicle-image duration-300 ${selectedVehicle == "van" ? "selected" : ""}`} alt="" onClick={() => handleVehicleClick("van")} />
        <img src="/multimedia/images/car.png" className={`w-[14%] vehicle-image duration-300 ${selectedVehicle == "car" ? "selected" : ""}`} alt="" onClick={() => handleVehicleClick("car")} />
        <img src="/multimedia/images/motorbike.png" className={`w-[10%] vehicle-image duration-300 ${selectedVehicle == "motorbike" ? "selected" : ""}`} alt="" onClick={() => handleVehicleClick("motorbike")} />
        <img src="/multimedia/images/bike.png" className={`w-1/12 vehicle-image duration-300 ${selectedVehicle == "bike" ? "selected" : ""}`} alt="" onClick={() => handleVehicleClick("bike")} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center justify-evenly mb-[30px] gap-x-[30px]">
        <input type="text" placeholder="Patente" name="patent" className="border-4 rounded border-third p-3 text-4xl text-center uppercase placeholder:text-xl placeholder:normal-case w-[200px] font-bold" />
        <button className="px-5 py-2 bg-third text-center text-2xl rounded font-bold" type="submit" name="submit">Enter</button>
      </form>
      <div className="flex items-center w-full relative">
        <div className="w-full h-full relative">
          <img src="/multimedia/images/race.png" alt="" className="w-full h-[250px]" />
          <div className="flex absolute bottom-[21%] left-[2%]">
            <img src={`/multimedia/images/${selectedVehicle}.png`} alt="" className={`w-[150px] selected vehicle-on-street`} />
            <h3 className={`insertingState font-black ${!inserting ? "text-red-600 text-4xl" : "text-green-600 text-3xl"} rotate-90`}>{!inserting ? "STOP" : "START"}</h3>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NewVehicle