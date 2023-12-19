import capitalize from "../../utils/string.utils.js"

const Table = ({ cols, data }) => {

  const tableSectionsClassName = "flex flex-col w-full";
  const tableRowClassName = `flex justify-evenly items-center h-full px-7 py-2 border-y-2 border-fourth`
  const tableCellClassName = "h-full flex items-center justify-start"

  return (
    <table className="flex flex-col w-4/5 items-center text-fourth">
      <thead
        className={tableSectionsClassName + " xl:px-auto xl:h-[70px] text-3xl bg-fourth text-primary"}>
        <tr className={tableRowClassName}>
          {cols.map(col => {
            return <th className={tableCellClassName}>{col.head}</th>
          })}
        </tr>
      </thead>
      <tbody
        className={tableSectionsClassName + " border-x-2 border-b-2 border-fourth text-2xl"}>
        {data.map(d => {
          return <tr className={tableRowClassName}>
            {cols.map(col => {
              return <td className={tableCellClassName}>{col.value == "vehicleType" ? capitalize(d[col.value]) : d[col.value]}</td>
            })}
          </tr>
        })}
      </tbody>
    </table>
  );
};


export default Table