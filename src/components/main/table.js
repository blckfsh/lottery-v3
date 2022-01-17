import { useContext } from 'react'
import { ContractContext } from '../../containers/main'
import Pagination from './pagination'

function Table() {

  const { allTable, table, currentPage, PageSize, changePage, setCurrentPage } = useContext(ContractContext)

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
          {
            table.length > 0 ?
            table.map((player, index) => {
              let { id, date, wallet_address, amount, entry, status } = player
              return (
                <tr key={index}>
                  <td>{id}</td>
                  <td>{date}</td>
                  <td>{wallet_address}</td>
                  <td>{amount}</td>
                  <td>{entry}</td>
                  <td>{status}</td>
                </tr>
              )
            }) : ' '
          }
        </tbody>
      </table>
      <Pagination
        className="pagination-bar d-flex justify-content-center"
        currentPage={currentPage}
        totalCount={allTable.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
        onPageChange={page => changePage(page)}
      />
    </div>
  )
}

export default Table
