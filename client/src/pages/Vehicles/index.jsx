import Link from "../../components/Link";
import { useEffect, useState } from "react";
import PendingTableRow from "../../components/PendingTableRow";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/vehicles")
      .then((res) => res.json())
      .then((json) => setVehicles(json.payload));
  }, []);

  const tableSectionsClassName = "flex flex-col w-full";
  const tableRowClassName =
    "grid grid-cols-4 items-center h-full px-7 py-2 border-y-2 border-fourth";
  const tableCellClassName = "h-full flex items-center justify-start";

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
      <table className="flex flex-col w-4/5 items-center text-fourth">
        <thead
          className={
            tableSectionsClassName +
            " xl:px-auto xl:h-[70px] text-3xl bg-fourth text-primary"
          }
        >
          <tr className={tableRowClassName}>
            <th className={tableCellClassName}>ID</th>
            <th className={tableCellClassName}>Patent</th>
            <th className={tableCellClassName}>Vehicle Type</th>
            <th className={tableCellClassName}>Date-time</th>
          </tr>
        </thead>
        <tbody
          className={
            tableSectionsClassName +
            "  border-x-2 border-b-2 border-fourth text-2xl"
          }
        >
          {vehicles ? (
            vehicles.map(
              ({ pendingId, patent, entryDateTime, vehicleType }) => {
                return (
                  <PendingTableRow
                    id={pendingId}
                    patent={patent}
                    datetime={entryDateTime}
                    type={vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}
                  />
                );
              }
            )
          ) : (
            <h1>Loading...</h1>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Vehicles;
