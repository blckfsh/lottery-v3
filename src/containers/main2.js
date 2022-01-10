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
import TableNoData from '../components/main/table-nodata'

export const ContractContext = React.createContext()

function Main() {

  const [account, setAccount] = useState('')
  const [sampleToken, setSampleToken] = useState('')
  const [tokenBalance, setTokenBalance] = useState('')
  const [lottery, setLottery] = useState('')
  const [lotteryAddress, setLotteryAddress] = useState('')
  const [pool, setPool] = useState('')
  const [table, setTable] = useState([])
  const [tableError, setTableError] = useState(false)

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
    console.log("current account: " + accounts)

    const ethBalance = web3.eth.getBalance(accounts[0])

    // Load Token
    const networkId = await web3.eth.net.getId()
    const tokenData = SampleToken.networks[networkId]

    if (tokenData) {
      const token = new web3.eth.Contract(SampleToken.abi, tokenData.address)
      setSampleToken(token)
      console.log("token: " + tokenData.address)

      let tokenBalances = await token.methods.balanceOf(accounts[0]).call()
      setTokenBalance(tokenBalances)
      console.log("balance: " + tokenBalances)
      console.log(await token.methods)

    } else {
      window.alert('Token contract not deployed to detected network')
    }

    // Load Lottery
    const tableArray = []
    const lotteryData = Lottery.networks[networkId]
    setLotteryAddress(lotteryData.address)

    if (lotteryData) {
      const lottery = new web3.eth.Contract(Lottery.abi, lotteryData.address)
      setLottery(lottery)

      // Get Lottery Pool
      let lotteryPool = await lottery.methods.getTokenBalanceOf(lotteryData.address).call()
      setPool(web3.utils.fromWei(lotteryPool, 'Ether'))
      console.log(`pool: ${web3.utils.fromWei(lotteryPool, 'Ether')}`)

      // Get Players
      let players = await lottery.methods.getPlayers().call()
      if (players.length > 0) {
        let { id, date, wallet_address, amount, entry, status } = players
        for (let count = 0; count < players.length; count++) {
          let player = await lottery.methods.getPlayerByAddress(players[count]).call()
          tableArray.push({
            id: player[0],
            date: player[1],
            wallet_address: player[2],
            amount: web3.utils.fromWei(player[3], 'Ether'),
            entry: web3.utils.fromWei(player[4], 'Ether'),
            status: player[5]
          })
          console.log(tableArray)
          setTable(tableArray)
        }
        setTableError(false)

      } else {
        setTableError(true)
      }



    } else {
      window.alert('Lottery contract not deployed to detected network')
    }
  }

  const acceptToken = async () => {
    let id = '10000013'
    let date = '01/06/2022'
    let amount = '10000000000000000000'
    let entry = '10000000000000000000'
    let success = 'success'
    // console.log(account)
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const lotteryData = Lottery.networks[networkId]
    // console.log(lotteryData.address)
    await sampleToken.methods.approve(lotteryData.address, '10000000000000000000')
                      .send({ from: account })
                      // .then(console.log('success'))
                      // .catch(console.log('error'))
                      .on('transactionHash', (hash) => {
                        // console.log("approve hash: " + hash)
                        // console.log("calling account: " + account)

                        // lottery.methods.acceptToken(id, date, amount, entry, success).call().then(res => console.log("accept: " + res)).catch(err => console.error)
                        lottery.methods.acceptToken(id, date, amount, entry, success)
                                    .send({ from: account, gas: '300000', gasPrice: web3.utils.toHex(2 * 1e9), gasLimit: web3.utils.toHex(210000) })
                                    .on('transactionHash', (hash) => {
                                      console.log("accept hash: " + hash)
                                    })
                                    .catch(err => console.log(err.message))
                      })
                      // await sampleToken.methods.allowance(account, lotteryData.address).call().then(res => console.log(res))
                      // lottery.methods.acceptToken(id, date, amount, entry, success).send({ from: account, gas: 4700000, gasPrice: 20000000000, }).call().then(res => console.log("accept: " + res)).catch(err => console.error)

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
          <ContractContext.Provider value={{ acceptToken }}>
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
