import { useContext } from 'react'
import { ContractContext } from '../../containers/main'

function Cta() {

    const { amount, setAmount, acceptToken } = useContext(ContractContext)

  return (
    <div className="d-grid gap-2">
      <div className="form-group">
        <label>Enter SLP Amount:</label>
        <input type="number" className="form-control" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <hr className="mb-3 mt-3" />
      <button className="btn btn-primary btn-lg" onClick={() => acceptToken()}>Pay Now</button>
      <button className="btn btn-warning btn-lg" onClick={() => console.log('Pay via QR Code')}>Pay via QR Code</button>
    </div>
  )
}

export default Cta
