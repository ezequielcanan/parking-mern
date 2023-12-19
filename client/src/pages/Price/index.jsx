import { useParams } from "react-router-dom"
import capitalize from "../../utils/string.utils.js"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BarLoader } from "react-spinners"


const Price = () => {
  const { vehicle } = useParams()
  const { register, handleSubmit } = useForm()
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(false)

  const onSubmit = (e) => {
    setLoading(true)
    fetch(`http://localhost:8080/api/prices/${vehicle}`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(e)})
      .then(res => res.json())
      .then(json => {
        json.payload.updated && setPrices(json.payload)
        setLoading(false)
      })
      .catch(console.error)
    

  }

  useEffect(() => {
    fetch(`http://localhost:8080/api/prices/${vehicle}`)
      .then(res => res.json())
      .then(json => {
        json.payload && setPrices(json.payload)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  return (
    <main className="h-auto flex flex-col items-center gap-y-[100px] justify-center bg-secondary min-h-screen pt-[220px] pb-[100px]">
      <h2 className="text-7xl text-third">{capitalize(vehicle)}</h2>
      {!loading ? (
        <form className="flex flex-col gap-y-[40px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <label className="text-fourth text-3xl pr-[40px]" htmlFor="hourPrice">Hour:</label>
            <input className="py-2 px-3 text-2xl" type="number" step={"any"} {...register("hourPrice")} />
          </div>
          <div className="flex justify-between">
            <label className="text-fourth text-3xl pr-[40px]" htmlFor="dayPrice">Day:</label>
            <input className="py-2 px-3 text-2xl" type="number" step={"any"} {...register("dayPrice")} />
          </div>
          <div className="flex justify-between">
            <label className="text-fourth text-3xl pr-[40px]" htmlFor="fractionPrice">Fraction:</label>
            <input className="py-2 px-3 text-2xl" type="number" step={"any"} {...register("fractionPrice")} />
          </div>
          <button type="submit" className="bg-sixth py-2 px-4 font-bold text-xl self-center duration-500 hover:bg-blue-300">Update</button>
        </form>
      ) : (
        <BarLoader className="mt-[200px]" color="#11ddff" width={200} height={10}/>
      )}
    </main>
  )
}

export default Price