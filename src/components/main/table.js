import { useContext } from 'react'
import { ContractContext } from '../../containers/main'

function Table() {

  const { table } = useContext(ContractContext)

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
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
