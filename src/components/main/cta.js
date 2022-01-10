import { useContext } from 'react'
import { ContractContext } from '../../containers/main'

function Cta() {

    const { acceptToken } = useContext(ContractContext)

  return (
    <div className="d-flex justify-content-center align-items-center">
      <button className="btn btn-primary btn-lg" onClick={() => acceptToken()}>join now</button>
    </div>
  )
}

export default Cta
