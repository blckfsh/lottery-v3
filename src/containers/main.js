import React, { useState, useEffect, useMemo } from 'react'
import Web3 from 'web3'
import moment from 'moment'

import SampleToken from '../abis/SampleToken.json'
import Lottery from '../abis/Lottery.json'

import NavBar from '../components/main/navbar'
import Pool from '../components/main/pool'
import Chart from '../components/main/chart'
import WheelComponent from '../components/main/wheel'
import Cta from '../components/main/cta'
import Table from '../components/main/table'
import TableNoData from '../components/main/table-nodata'
import ModalComponent from '../components/main/modal'

export const ContractContext = React.createContext()

function Main() {

  const [account, setAccount] = useState('')
  const [owner, setOwner] = useState('')
  const [sampleToken, setSampleToken] = useState('')
  const [tokenBalance, setTokenBalance] = useState('')
  const [lottery, setLottery] = useState('')
  const [lotteryAddress, setLotteryAddress] = useState('')


  const [totalPlayers, setTotalPlayers] = useState(0)
  const [amount, setAmount] = useState('')
  const [gasFee, setGasFee] = useState(0)
  const [isAcceptingToken, setIsAcceptingToken] = useState(true)

  // table
  const [currentPage, setCurrentPage] = useState(1)
  const [tableError, setTableError] = useState(false)
  const [table, setTable] = useState([])
  const [allTable, setAllTable] = useState([])

  // portion
  const [prizePercentage, setPrizePercentage] = useState(70)
  const [burnPercentage, setBurnPercentage] = useState(20)
  const [guildPercentage, setGuildPercentage] = useState(10)
  const [pool, setPool] = useState('')

  // roulette wheel
  const [segment, setSegment] = useState([])
  const [mustSpin, setMustSpin] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [wallet_address, setWallet_Address] = useState('')

  useEffect(async () => {
    loadWeb3()
    loadBlockchainData(1)
    // getPlayersTable()
    visibleSpinCta()
  }, [])

  // table
  let PageSize = 3
  // const getPlayersTable = useMemo(async () => {
  //   const web3 = window.web3 // initialize web3js
  //   const networkId = await web3.eth.net.getId()
  //   const lotteryData = Lottery.networks[networkId]
  //   const lottery = new web3.eth.Contract(Lottery.abi, lotteryData.address)
  //
  //   let tableArray = []
  //   let players = await lottery.methods.getPlayers().call()
  //
  //   if (players.length > 0) {
  //
  //     // display the data on table
  //     for (let count = 0; count < players.length; count++) {
  //       let player = await lottery.methods.getPlayerById(players[count]).call()
  //
  //       tableArray.push({
  //         id: player[0],
  //         date: player[1],
  //         wallet_address: player[2],
  //         amount: web3.utils.fromWei(player[3], 'Ether'),
  //         entry: player[4],
  //         status: player[5]
  //       })
  //     }
  //
  //     const firstPageIndex = (currentPage - 1) * PageSize
  //     const lastPageIndex = firstPageIndex + PageSize
  //     let newTableArray = tableArray.slice(firstPageIndex, lastPageIndex)
  //
  //     setAllTable(tableArray)
  //     setTable(newTableArray)
  //     setTableError(false)
  //   } else {
  //     setTableError(true)
  //   }
  // }, [])

  const addingPad = (num, size) => {
    let s = num+""
    while (s.length < size) s = '0' + s
    return s
  }

  // Adding validation in token amount
  const handleChange = (event) => {
    const re = /^[0-9\b]+$/

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

  const loadBlockchainData = async (page) => {
    const web3 = window.web3 // initialize web3js
    const accounts = await web3.eth.getAccounts() // get default account

    // set default account
    setAccount(accounts[0])
    // console.log("current account: " + accounts)

    // START: Load Token Smart Contract
    const networkId = await web3.eth.net.getId()
    const tokenData = SampleToken.networks[networkId]

    if (tokenData) {
      const token = new web3.eth.Contract(SampleToken.abi, tokenData.address)
      setSampleToken(token)
      console.log("token address: " + tokenData.address)

      let tokenBalances = await token.methods.balanceOf(accounts[0]).call()
      setTokenBalance(tokenBalances)
      // console.log("balance: " + web3.utils.fromWei(tokenBalances, 'Ether'))
    } else {
      window.alert('Token contract not deployed to detected network')
    }
    // END: Load Token Smart Contract

    // START: Load Lottery Smart Contract
    const tableArray = []
    const checkLastIdArray = []
    const playerAddress = []
    const segments = []
    const lotteryData = Lottery.networks[networkId]
    setLotteryAddress(lotteryData.address)

    if (lotteryData) {
      const lottery = new web3.eth.Contract(Lottery.abi, lotteryData.address)
      setLottery(lottery)

      // Get Lottery Pool
      let lotteryPool = await lottery.methods.getTokenBalanceOf(lotteryData.address).call()
      let computePrizePool = parseInt(lotteryPool) * parseInt(prizePercentage) / 100
      setPool(web3.utils.fromWei(computePrizePool.toString(), 'Ether'))
      // console.log(`pool: ${web3.utils.fromWei(computePrizePool.toString(), 'Ether')}`)

      // get owner address
      let lotteryOwner = await lottery.methods.owner().call()
      setOwner(lotteryOwner)
      // console.log("owner: " + lotteryOwner)

      // Get Player Entry
      let playerEntry = await lottery.methods.getPlayerEntries().call()
      if (playerEntry.length > 0) {
        for (let count = 0; count < playerEntry.length; count++) {
          segments.push({option: playerEntry[count]})
        }
      } else if (playerEntry.length < 1) {
        for (let count = 0; count < 4; count++) {
            segments.push({option: '0x00000000000000000000000000000'})
        }
      }
      setSegment(segments)

      // Get Players
      let players = await lottery.methods.getPlayers().call()
      if (players.length > 0) {

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

        const firstPageIndex = (page - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        let newTableArray = tableArray.slice(firstPageIndex, lastPageIndex)

        setTable(newTableArray)
        setAllTable(tableArray)
        setTableError(false)
      } else {
        setTableError(true)
      }
    } else {
      window.alert('Lottery contract not deployed to detected network')
    }
    // END: Load Lottery Smart Contract
  }

  const changePage = (page) => {
    setCurrentPage(page)
    loadBlockchainData(page)
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
    let getTotalPlayes = await lottery.methods.getAllPlayers().call()
    newValue = fixedValue + (parseInt(getTotalPlayes.length) + 1)
    id = addingPad(newValue, 7)
    console.log("calling this one: " + id)
    // console.log(convertedAmount)
    // console.log(tokenBalance)

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
                                                        // window.location.reload()
                                                        loadBlockchainData(currentPage)
                                                        setAmount('')
                                                        setIsAcceptingToken(false)
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

  const visibleSpinCta = async () => {
    const web3 = window.web3 // initialize web3js
    const accounts = await web3.eth.getAccounts() // get default account

    const networkId = await web3.eth.net.getId()
    const lotteryData = Lottery.networks[networkId]
    const lottery = new web3.eth.Contract(Lottery.abi, lotteryData.address)

    let lotteryOwner = await lottery.methods.owner().call()

    if (accounts[0] === lotteryOwner) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }

  const pickWinner = async () => {
    setMustSpin(true)
    const web3 = window.web3 // initialize web3js

    const networkId = await web3.eth.net.getId()
    const lotteryData = Lottery.networks[networkId]
    const lottery = new web3.eth.Contract(Lottery.abi, lotteryData.address)
    const newPrizeNumber = Math.floor(Math.random() * segment.length)

    // let prizePercent = web3.utils.fromWei(prizePercentage.toString(), 'Ether')
    // let burnPercent = web3.utils.fromWei(burnPercentage.toString(), 'Ether')
    // let guildPercent = web3.utils.fromWei(guildPercentage.toString(), 'Ether')

    if (pool > 0) {
      await lottery.methods.pickWinner(segment[newPrizeNumber].option, prizePercentage, burnPercentage, guildPercentage)
                        .estimateGas({ from: account })
                        .then(res => {
                          setWallet_Address(segment[newPrizeNumber].option)
                          lottery.methods.pickWinner(segment[newPrizeNumber].option, prizePercentage, burnPercentage, guildPercentage)
                                      .send({ from: account, gas: res.toString(), gasPrice: web3.utils.toHex(2 * 1e9), gasLimit: web3.utils.toHex(210000) })
                                      .on('transactionHash', (hash) => {
                                        console.log("prize picked: " + hash)
                                      })
                                      .catch(error => console.error)
                        })
                        .catch(error => console.error)
    } else {
      // window.alert('No Prize Pool')
    }
  }

  const stopPick = async () => {
    setMustSpin(false)
    setIsModalOpen(true)
    loadBlockchainData(currentPage)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
          <ContractContext.Provider value={{ lotteryAddress, segment, mustSpin, stopPick, pool, isOwner, pickWinner, account }}>
            <WheelComponent />
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
          <ContractContext.Provider value={{ allTable, table, currentPage, PageSize, changePage, setCurrentPage }}>
            <Table />
          </ContractContext.Provider>
        }
      </div>
      <ContractContext.Provider value={{ wallet_address, closeModal, isModalOpen }}>
        <ModalComponent />
      </ContractContext.Provider>
    </>
  )
}

export default Main
