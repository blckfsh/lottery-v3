import { useEffect, useContext } from 'react'
import { ContractContext } from '../../containers/main'

// Import Wheel
import { Wheel } from 'react-custom-roulette'

function WheelComponent() {

  const { lotteryAddress, segment, mustSpin, stopPick, pool, isOwner, pickWinner } = useContext(ContractContext)
  // console.log(segment)

  return (
    <>
      <div className="cx-wheel mb-5">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={pool}
          data={segment}
          backgroundColors={['#2ecc71', '#3498db', '#9b59b6', '#e67e22', '#f1c40f']}
          textColors={['#ffffff']}
          fontSize={7}
          textDistance={55}
          onStopSpinning={() => {
            stopPick()
          }}
        />
        <div className="cx-wheel-cta d-grid gap-2 mt-3">
          <button onClick={() => pickWinner()} className={isOwner === true ? "btn btn-block btn-primary visible" : "btn btn-block btn-primary not-visible"}>SPIN</button>
        </div>
      </div>
      <div>
        <p className="cx-wheel-text text-center">Address: {lotteryAddress}</p>
      </div>
    </>
  )
}

export default WheelComponent
