import { useContext } from 'react'
import { ContractContext } from '../../containers/main'

// Import Wheel
import WheelComponent from 'react-wheel-of-prizes'
// import 'react-wheel-of-prizes/dist/index.css'

function Wheel() {

  const { lotteryAddress, segment, segColors, pickWinner } = useContext(ContractContext)
  
  return (
    <>
      <div className="cx-wheel">
        <WheelComponent
          segments={segment}
          segColors={segColors}
          // winningSegment='won 10'
          onFinished={(winner) => pickWinner(winner)}
          primaryColor='black'
          contrastColor='white'
          buttonText='Spin'
          isOnlyOnce={true}
          size={290}
          upDuration={600}
          downDuration={1000}
          fontFamily='Arial'
        />
      </div>
      <div>
        <p className="cx-wheel-text text-center">Address: {lotteryAddress}</p>
      </div>
    </>
  )
}

export default Wheel
