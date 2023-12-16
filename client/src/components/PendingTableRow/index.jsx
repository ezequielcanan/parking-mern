const PendingTableRow = ({ id, patent, type, datetime }) => {
  const tableRowClassName = "grid grid-cols-4 items-center h-full px-7 py-2 border-y-2 border-fourth"
  const tableCellClassName = "h-full flex items-center justify-start"

  return (
    <tr className={tableRowClassName}>
      <td className={tableCellClassName}>{id}</td>
      <td className={tableCellClassName}>{patent}</td>
      <td className={tableCellClassName}>{type}</td>
      <td className={tableCellClassName}>{datetime}</td>
    </tr>
  );
};


export default PendingTableRow