import { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import Table from "../../components/Table"

const Report = () => {
  const [payments, setPayments] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8080/api/vehicles/report")
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setPayments({total: json?.payload?.total, data: json?.payload?.payments})
      })
  }, [])

  console.log(payments)

  const cols = [
    {head: "ID", value: "pendingId"},
    {head: "Patent", value: "patent"},
    {head: "Vehicle Type", value: "vehicleType"},
    {head: "Entry Date-Time", value: "entryDateTime"},
    {head: "Exit Date-Time", value: "exitDateTime"},
    {head: "Total", value: "total"}
  ]

  return (
    <main className="flex flex-col items-center bg-secondary gap-y-[80px] pt-[200px] pb-[70px] min-h-screen overflow-hidden">
      <div className="flex flex-col items-center gap-y-[60px] w-full">
        <h2 className="text-5xl text-third font-semibold">Payments' report</h2>
      </div>
      <>
        {payments ? (
          <Table cols={cols} data={payments.data}/>
        ) : (
          <BarLoader className="mt-[200px]" color="#11ddff" width={200} height={10}/>
        )}
      </>
    </main>
  )
}

export default Report