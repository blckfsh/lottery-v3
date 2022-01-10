import { useContext } from 'react'
import { ContractContext } from '../../containers/main'

function Table() {

  const { table } = useContext(ContractContext)
  console.log(JSON.stringify(table))

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
            table.map((player) => {
              let { id, date, wallet_address, amount, entry, status } = player
              return (
                <tr>
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
