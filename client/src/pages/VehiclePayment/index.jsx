import { useState } from "react"
import capitalize from "../../utils/string.utils.js"

const VehiclePayment = () => {
  const [paid, setPaid] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!e.currentTarget.id.value) return alert("You must enter a valid id")
    fetch(`http://localhost:8080/api/vehicles/payment/${e.currentTarget.id.value.toUpperCase()}`)
      .then(res => res.json())
      .then(json => {
        setPaid(json.payload)
      })
  }

  console.log(paid)
  return (
    <main className="w-full h-auto flex flex-col items-center bg-secondary min-h-screen pt-[220px] pb-[100px]">
      <>
        {!paid ? (
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center h-full">
            <div className="text-center">
              <label htmlFor="id" className="text-center text-4xl text-fourth px-5">ID or Patent:</label>
              <input type="text" name="id" id="id" className="text-3xl px-2 py-1 uppercase" />
            </div>
            <button type="submit" className="px-5 py-3 bg-green-500 w-auto text-3xl mt-[100px] duration-500 hover:bg-green-700">Enter</button>
          </form>
        ) : (
          <>
            {paid?.paid != false ? (
              <>
                <div className="flex flex-col gap-y-[80px] items-center">
                  <h2 className="text-4xl text-fourth font-bold">{capitalize(paid.vehicleType)} - {paid.patent || paid.pendingId}: ${paid.total}</h2>
                  <div>
                    <h3 className="text-2xl font-semibold text-fourth my-[20px]">Entry Date-Time: {paid.entryDateTime}</h3>
                    <h3 className="text-2xl font-semibold text-fourth my-[20px]">Exit Date-Time: {paid.exitDateTime}</h3>
                  </div>
                  <button onClick={() => setPaid(false)} className="text-3xl bg-fourth text-primary duration-500 py-3 px-4 my-[40px] rounded hover:text-fourth hover:bg-primary">Return to payments</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-5xl font-bold text-fourth my-[40px]">Not found</h3>
                <button onClick={() => setPaid(false)} className="text-3xl bg-fourth text-primary duration-500 py-3 px-4 my-[40px] rounded hover:text-fourth hover:bg-primary">Return to payments</button>
              </>
            )
            }
          </>
        )}
      </>
    </main>
  )
}

export default VehiclePayment