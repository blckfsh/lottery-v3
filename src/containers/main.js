import React, { useState, useEffect } from 'react'
import web3 from 'web3'

import SampleToken from '../abis/SampleToken.json'
import Lottery from '../abis/Lottery.json'

import NavBar from '../components/main/navbar'
import Pool from '../components/main/pool'
import Chart from '../components/main/chart'
import Wheel from '../components/main/wheel'
import Cta from '../components/main/cta'
import Table from '../components/main/table'

function Main() {
  return (
    <>
      <div className="cx-navbar d-flex justify-content-center align-items-center">
        <NavBar />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Pool />
      </div>
      <div className="cx-body mt-5 mb-5 d-flex flex-row flex-wrap">
        <div className="cx-content d-flex justify-content-center align-items-center">
          <Chart />
        </div>
        <div className="cx-content d-flex justify-content-center align-items-center">
          <Wheel />
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
