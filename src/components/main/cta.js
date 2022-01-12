import { useContext } from 'react'
import { ContractContext } from '../../containers/main'

function Cta() {

    const { amount, handleChange, acceptToken, isAcceptingToken } = useContext(ContractContext)

  return (
    <div className="d-grid gap-2">
      <div className="form-group">
        <label>Enter SLP Amount:</label>
        <input type="text" className="form-control" name="amount" value={amount} onChange={(e) => handleChange(e)} />
      </div>
      <hr className="mb-3 mt-3" />
      <button className="btn btn-primary btn-lg" disabled={isAcceptingToken} onClick={() => acceptToken()}>Pay Now</button>
      <button className="btn btn-warning btn-lg" disabled={isAcceptingToken} onClick={() => console.log('Pay via QR Code')}>Pay via QR Code</button>
    </div>
  )
}

export default Cta
