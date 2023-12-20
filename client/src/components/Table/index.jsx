import capitalize from "../../utils/string.utils.js"

const Table = ({ cols, data }) => {

  const tableSectionsClassName = "flex flex-col w-full";
  const tableRowClassName = `flex items-stretch h-full px-7 py-2 border-y-2 border-fourth`
  const tableCellClassName = "flex items-center w-1/5 justify-start"

  return (
    <table className="flex flex-col w-[600px] md:w-4/5 items-center text-fourth">
      <thead
        className={tableSectionsClassName + " xl:px-auto xl:h-[70px] text-xs md:text-xl lg:text-3xl bg-fourth text-primary"}>
        <tr className={tableRowClassName}>
          {cols.map(col => {
            return <th key={col.head} className={tableCellClassName}>{col.head}</th>
          })}
        </tr>
      </thead>
      <tbody
        className={tableSectionsClassName + " border-x-2 border-b-2 border-fourth text-sm md:text-lg lg:text-2xl"}>
        {data.map(d => {
          return <tr className={tableRowClassName} key={d._id}>
            {cols.map(col => {
              return <td key={col.value} className={tableCellClassName}>{col.value == "vehicleType" ? capitalize(d[col.value]) : d[col.value]}</td>
            })}
          </tr>
        })}
      </tbody>
    </table>
  );
};


export default Table