import React, { useState, useEffect } from 'react'
import Web3 from 'web3'

import SampleToken from '../abis/SampleToken.json'
import Lottery from '../abis/Lottery.json'

import NavBar from '../components/main/navbar'
import Pool from '../components/main/pool'
import Chart from '../components/main/chart'
import Wheel from '../components/main/wheel'
import Cta from '../components/main/cta'
import Table from '../components/main/table'

export const ContractContext = React.createContext()

function Main() {

  const [account, setAccount] = useState('')
  const [sampleToken, setSampleToken] = useState('')
  const [tokenBalance, setTokenBalance] = useState('')
  const [lottery, setLottery] = useState('')
  const [lotteryAddress, setLotteryAddress] = useState('')
  const [pool, setPool] = useState('')

  useEffect(async () => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying Metamask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const ethBalance = await web3.eth.getBalance(accounts[0])

    // Load Token
    const networkId = await web3.eth.net.getId()
    const tokenData = SampleToken.networks[networkId]

    if (tokenData) {
      const token = new web3.eth.Contract(SampleToken.abi, tokenData.address)
      setSampleToken(token)

      let tokenBalance = await token.methods.balanceOf(accounts[0]).call()
      setTokenBalance(tokenBalance)
    } else {
      window.alert('Token contract not deployed to detected network')
    }

    // Load Lottery
    const lotteryData = Lottery.networks[networkId]
    setLotteryAddress(lotteryData.address)

    if (lotteryData) {
      const lottery = new web3.eth.Contract(Lottery.abi, lotteryData.address)
      setLottery(lottery)

      // Get Lottery Pool
      let lotteryPool = await lottery.methods.getBalance().call()
      setPool(lotteryPool)

      // Get Players
      // let players = await lottery.methods.players().call()
      // if (!players) console.log('No players found')
      // console.log(await lottery.methods)

    } else {
      window.alert('Lottery contract not deployed to detected network')
    }
  }

  return (
    <>
      <div className="cx-navbar d-flex justify-content-center align-items-center">
        <NavBar />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <ContractContext.Provider value={{ pool }}>
          <Pool />
        </ContractContext.Provider>
      </div>
      <div className="cx-body mt-5 mb-5 d-flex flex-row flex-wrap">
        <div className="cx-content d-flex justify-content-center align-items-center">
          <Chart />
        </div>
        <div className="cx-content d-flex flex-column justify-content-between align-items-center">
          <ContractContext.Provider value={{ lotteryAddress }}>
            <Wheel />
          </ContractContext.Provider>
        </div>
        <div className="cx-content d-flex justify-content-center align-items-center">
          <Cta />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Table />
      </div>
    </>
  )
}

export default Main
