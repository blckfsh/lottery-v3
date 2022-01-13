import { useContext } from 'react'
import { ContractContext } from '../../containers/main'

function Wheel() {

  const { lotteryAddress } = useContext(ContractContext)

  return (
    <>
      <div>

      </div>
      <div>
        <p className="cx-wheel-text text-center">Address: {lotteryAddress}</p>
      </div>
    </>
  )
}

export default Wheel
