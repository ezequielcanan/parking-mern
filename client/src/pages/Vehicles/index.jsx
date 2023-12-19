import Link from "../../components/Link";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners"
import Table from "../../components/Table";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(false);

  const cols = [
    {head: "ID", value: "pendingId"},
    {head: "Patent", value: "patent"},
    {head: "Vehicle Type", value: "vehicleType"},
    {head: "Entry Date-Time", value: "entryDateTime"}
  ]

  useEffect(() => {
    fetch("http://localhost:8080/api/vehicles")
      .then((res) => res.json())
      .then((json) => setVehicles(json.payload));
  }, []);


  return (
    <main className="flex flex-col items-center bg-secondary gap-y-[80px] pt-[200px] pb-[70px] min-h-screen overflow-hidden">
      <div className="flex flex-col items-center gap-y-[60px] w-full">
        <h2 className="text-5xl text-third font-semibold">Pending Vehicles</h2>
        <Link
          className="px-5 py-4 text-center text-sixth font-semibold max-w-[200px] text-2xl"
          path={"/vehicles/new-vehicle"}
          text={"New Vehicle"}
        />
      </div>
      {vehicles ? (
        <Table data={vehicles} cols={cols}/>
      ) : (
        <BarLoader className="mt-[200px]" color="#11ddff" width={200} height={10}/>
      )}
    </main>
  );
};

export default Vehicles;
