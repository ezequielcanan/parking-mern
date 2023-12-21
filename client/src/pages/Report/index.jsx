import { useEffect, useRef, useState } from "react"
import { BarLoader } from "react-spinners"
import Table from "../../components/Table"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { useNavigate } from "react-router-dom"

const Report = () => {
  const [payments, setPayments] = useState(false)
  const pdfRef = useRef(null) 
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:8080/api/vehicles/report")
      .then(res => res.json())
      .then(json => {
        setPayments({total: json?.payload?.total, data: json?.payload?.payments})
      })
  }, [])

  const cols = [
    {head: "ID", value: "pendingId"},
    {head: "Patent", value: "patent"},
    {head: "Vehicle Type", value: "vehicleType"},
    {head: "Entry", value: "entryDateTime"},
    {head: "Exit", value: "exitDateTime"},
    {head: "Total", value: "total"}
  ]

  const generateReport = () => {
    const input = pdfRef.current
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF('p', "mm", "a4", true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight/imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30
      pdf.setFillColor(58,91,160)
      pdf.printHeaderRow = true
      pdf.rect(0, 0, 300, 1000, "F");
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save("Report.pdf")
    })
    
    fetch("http://localhost:8080/api/vehicles/generate-report")
      .then(res => res.json())
      .then(({payload}) => payload == "Reseted" && navigate("/"))
  }

  return (
    <main className="flex flex-col items-center justify-items-center bg-secondary gap-y-[80px] px-[20px] pt-[200px] pb-[70px] min-h-screen overflow-hidden">
      <div className="flex flex-col items-center gap-y-[60px] w-full">
        <h2 className="text-5xl text-third font-semibold">Payments' report</h2>
        <button onClick={generateReport} className="bg-third font-bold text-3xl py-3 px-5">Generate Report</button>
      </div>
      <div className="w-full flex flex-col items-center gap-y-[80px] bg-secondary" ref={pdfRef}>
        {payments ? (
          <>
            <h2 className="text-9xl font-bold text-green-400 mb-[50px] text-center">Total: ${payments.total}</h2>
            <Table cols={cols} data={payments.data} />
          </>
        ) : (
          <BarLoader className="mt-[200px]" color="#11ddff" width={200} height={10}/>
        )}
      </div>
    </main>
  )
}

export default Report