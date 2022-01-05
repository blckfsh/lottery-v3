import { useContext } from 'react'
import { ContractContext } from '../../containers/main'

function Wheel() {

  const { lotteryAddress } = useContext(ContractContext)

  return (
    <>
      <div className="cx-wheel">

      </div>
      <div>
        <p className="cx-wheel-text text-center">Address: {lotteryAddress}</p>
      </div>
    </>
  )
}

export default Wheel
