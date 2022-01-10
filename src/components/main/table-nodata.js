function TableNoData() {

  return (
    <div className="cx-table">
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>id</th>
            <th>date</th>
            <th>address</th>
            <th>amount</th>
            <th>entry</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="6">No players found</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableNoData
