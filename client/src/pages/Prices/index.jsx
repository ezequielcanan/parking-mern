import { useEffect, useState } from "react"
import PriceCard from "../../components/PriceCard"
import { BarLoader } from "react-spinners"

const Prices = () => {
  let [prices, setPrices] = useState({car: {}, van: {}, motorbike: {}, bike: {}})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8080/api/prices")
      .then(res => res.json())
      .then(json => {
        if (json.payload.length) {
          json.payload.forEach(v => {
            prices[v.vehicle] = {...v}
          })
          console.log(prices)
          setPrices(prices)
        }
        setLoading(false)
      })
      .catch(console.error)
  }, [])
  return (
    <main className="h-auto grid grid-cols-2 items-center justify-items-center bg-secondary min-h-screen pt-[220px] pb-[100px]">
      {!loading ? (
        <>
          {Object.keys(prices).map(p => {
            return <PriceCard key={p} vehicle={p} hour={prices[p].hourPrice} day={prices[p].dayPrice} fraction={prices[p].fractionPrice}/>
          })}
        </>
      ) : (
        <BarLoader className="mt-[200px] col-span-2" color="#11ddff" width={200} height={10}/>
      )}
    </main>
  )
}

export default Prices