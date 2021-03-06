import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import moment from 'moment'

import SampleToken from '../abis/SampleToken.json'
import Lottery from '../abis/Lottery.json'

import NavBar from '../components/main/navbar'
import Pool from '../components/main/pool'
import Chart from '../components/main/chart'
import Wheel from '../components/main/wheel'
import Cta from '../components/main/cta'
import Table from '../components/main/table'
import TableNoData from '../components/main/table-nodata'

export const ContractContext = React.createContext()

function Main() {

  const [account, setAccount] = useState('')
  const [owner, setOwner] = useState('')
  const [sampleToken, setSampleToken] = useState('')
  const [tokenBalance, setTokenBalance] = useState('')
  const [lottery, setLottery] = useState('')
  const [lotteryAddress, setLotteryAddress] = useState('')
  const [pool, setPool] = useState('')
  const [table, setTable] = useState([])
  const [tableError, setTableError] = useState(false)
  const [totalPlayers, setTotalPlayers] = useState(0)
  const [amount, setAmount] = useState('')
  const [gasFee, setGasFee] = useState(0)
  const [isAcceptingToken, setIsAcceptingToken] = useState(true)

  useEffect(async () => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const addingPad = (num, size) => {
    let s = num+""
    while (s.length < size) s = '0' + s
    return s
  }

  // Adding validation in token amount
  const handleChange = (event) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value !== '' && re.test(event.target.value)) {
        setIsAcceptingToken(false)
       setAmount(event.target.value)
    } else {
      setIsAcceptingToken(true)
      setAmount(event.target.value)
    }
  }

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
    const web3 = window.web3 // initialize web3js
    const accounts = await web3.eth.getAccounts() // get default account

    // set default account
    setAccount(accounts[0])
    console.log("current account: " + accounts)

    // START: Load Token Smart Contract
    const networkId = await web3.eth.net.getId()
    const tokenData = SampleToken.networks[networkId]

    if (tokenData) {
      const token = new web3.eth.Contract(SampleToken.abi, tokenData.address)
      setSampleToken(token)
      console.log("token address: " + tokenData.address)

      let tokenBalances = await token.methods.balanceOf(accounts[0]).call()
      setTokenBalance(tokenBalances)
      console.log("balance: " + web3.utils.fromWei(tokenBalances, 'Ether'))
    } else {
      window.alert('Token contract not deployed to detected network')
    }
    // END: Load Token Smart Contract

    // START: Load Lottery Smart Contract
    const tableArray = []
    const checkLastIdArray = []
    const playerAddress = []
    const lotteryData = Lottery.networks[networkId]
    setLotteryAddress(lotteryData.address)

    if (lotteryData) {
      const lottery = new web3.eth.Contract(Lottery.abi, lotteryData.address)
      setLottery(lottery)

      // Get Lottery Pool
      let lotteryPool = await lottery.methods.getTokenBalanceOf(lotteryData.address).call()
      setPool(web3.utils.fromWei(lotteryPool, 'Ether'))
      console.log(`pool: ${web3.utils.fromWei(lotteryPool, 'Ether')}`)

      let lotteryOwner = await lottery.methods.owner().call()
      setOwner(lotteryOwner)
      console.log("owner: " + lotteryOwner)
      // console.log(await lottery.methods)

      // Get Players
      let players = await lottery.methods.getPlayers().call()
      if (players.length > 0) {

        console.log(players)

        // display the data on table
        for (let count = 0; count < players.length; count++) {
          let player = await lottery.methods.getPlayerById(players[count]).call()

          tableArray.push({
            id: player[0],
            date: player[1],
            wallet_address: player[2],
            amount: web3.utils.fromWei(player[3], 'Ether'),
            entry: player[4],
            status: player[5]
          })
        }
        console.log(tableArray)
        setTable(tableArray)
        setTableError(false)

      } else {
        setTableError(true)
      }
    } else {
      window.alert('Lottery contract not deployed to detected network')
    }
    // END: Load Lottery Smart Contract
  }

  const acceptToken = async () => {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const lotteryData = Lottery.networks[networkId]

    let fixedValue = 10010
    let newValue
    let id
    let date = moment().format('l')
    let converterValue = 1000000000000000000
    let convertedAmount = parseInt(amount) * parseInt(converterValue) // 000000000000000000
    let entry = web3.utils.fromWei(convertedAmount.toString(), 'Ether')
    let success = 'success'

    // setup id
    let getTotalPlayes = await lottery.methods.getPlayers().call()
    newValue = fixedValue + (parseInt(getTotalPlayes.length) + 1)
    id = addingPad(newValue, 7)
    console.log(convertedAmount)
    console.log(tokenBalance)

    if (amount > 0) {
      if (convertedAmount <= tokenBalance) {
        await sampleToken.methods.approve(lotteryData.address, convertedAmount.toString())
                          .send({ from: account })
                          .on('transactionHash', (hash) => {
                            lottery.methods.acceptToken(id, date, convertedAmount.toString(), entry, success)
                                        .estimateGas({ from: account })
                                        .then(res => {
                                          lottery.methods.acceptToken(id, date, convertedAmount.toString(), entry, success)
                                                      .send({ from: account, gas: res.toString(), gasPrice: web3.utils.toHex(2 * 1e9), gasLimit: web3.utils.toHex(210000) })
                                                      .on('transactionHash', (hash) => {
                                                        window.location.reload()
                                                      })
                                                      .catch(err => console.log(err.message))
                                        })

                          })
      } else {
        window.alert(`You cannot bet more than what you have. Your SLP token balance is ${web3.utils.fromWei(tokenBalance, 'Ether')}`)
      }
    } else {
      window.alert('Bet atleast 1 slp.')
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
        <div className="cx-content cx-cta">
          <ContractContext.Provider value={{ acceptToken, amount, handleChange, isAcceptingToken }}>
            <Cta />
          </ContractContext.Provider>
        </div>
      </div>
      <div className="d-flex mt-5 mb-5 justify-content-center align-items-center">
        {
          tableError === true ?
          <TableNoData /> :
          <ContractContext.Provider value={{ table }}>
            <Table />
          </ContractContext.Provider>
        }
      </div>
    </>
  )
}

export default Main
