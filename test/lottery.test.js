const SampleToken = artifacts.require('SampleToken')
const Lottery = artifacts.require('Lottery')

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('Lottery', ([deployer, investor]) => {
  let token, lottery

  before(async () => {
    token = await SampleToken.new('100')
		lottery = await Lottery.new(token.address)
    accounts = await web3.eth.getAccounts()

    // Transfer all tokens to accounts (100 tokens)
  	await token.transfer(accounts[1], '20')
    await token.transfer(accounts[2], '20')
    await token.transfer(accounts[3], '20')
    await token.transfer(accounts[4], '20')
    await token.transfer(accounts[5], '20')
  })

  describe('Token deployment', async () => {
		it('contract has a name', async () => {
			const name = await token.name()
      const symbol = await token.symbol()
			assert.equal(name, 'SampleToken')
      assert.equal(symbol, 'SMT')
		})
	})

  describe('Lottery deployment', async () => {
		it('contract has a owner', async () => {
			const owner = await lottery.owner()
			assert.equal(owner, accounts[0])
		})

		it('contract has no tokens', async() => {
			let balance = await token.balanceOf(lottery.address)
			assert.equal(balance.toString(), '0')
		})
	})

  describe('accept token from player 1', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before sending
      await token.approve(lottery.address, '20', {from: accounts[1]})

      // Transfer tokens from account address to lottery address
      result = await lottery.acceptToken('20', {from: accounts[1]})
    })

    it('Allows players to bet token to lottery', async () => {
      // Check Investor token balance after bet
      let investorBalance = await token.balanceOf(accounts[1])
      assert.equal(investorBalance.toString(), '0')

      // Check Lottery balance after bet
      let lotteryBalance
      lotteryBalance = await token.balanceOf(lottery.address)
      assert.equal(lotteryBalance.toString(), '20')
      // lotteryBalance = await web3.eth.getBalance(lottery.address)
      // assert.equal(lotteryBalance.toString(), '')

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
			assert.equal(event._from, accounts[1])
			assert.equal(event._destAddr, lottery.address)
      assert.equal(event._amount.toString(), '20')

      // FAILURE: Investor can't bet more tokens than they have
			await lottery.acceptToken('21', { from: accounts[1] }).should.be.rejected;
    })
  })

  // describe('accept token from player 2', async () => {
  //   let result
  //
  //   before(async () => {
  //     // Investor must approve tokens before sending
  //     await token.approve(lottery.address, '20', {from: accounts[2]})
  //
  //     // Transfer tokens from account address to lottery address
  //     result = await lottery.acceptToken('20', {from: accounts[2]})
  //   })
  //
  //   it('Allows players to bet token to lottery', async () => {
  //     // Check Investor token balance after bet
  //     let investorBalance = await token.balanceOf(accounts[2])
  //     assert.equal(investorBalance.toString(), '0')
  //
  //     // Check Lottery balance after bet
  //     let lotteryBalance
  //     lotteryBalance = await token.balanceOf(lottery.address)
  //     assert.equal(lotteryBalance.toString(), '40')
  //     // lotteryBalance = await web3.eth.getBalance(lottery.address)
  //     // assert.equal(lotteryBalance.toString(), '')
  //
  //     // Check logs to ensure event was emitted with correct data
  //     const event = result.logs[0].args
	// 		assert.equal(event._from, accounts[2])
	// 		assert.equal(event._destAddr, lottery.address)
  //     assert.equal(event._amount.toString(), '20')
  //
  //     // FAILURE: Investor can't bet more tokens than they have
	// 		await lottery.acceptToken('21', { from: accounts[2] }).should.be.rejected;
  //   })
  // })
  //
  // describe('accept token from player 3', async () => {
  //   let result
  //
  //   before(async () => {
  //     // Investor must approve tokens before sending
  //     await token.approve(lottery.address, '20', {from: accounts[3]})
  //
  //     // Transfer tokens from account address to lottery address
  //     result = await lottery.acceptToken('20', {from: accounts[3]})
  //   })
  //
  //   it('Allows players to bet token to lottery', async () => {
  //     // Check Investor token balance after bet
  //     let investorBalance = await token.balanceOf(accounts[3])
  //     assert.equal(investorBalance.toString(), '0')
  //
  //     // Check Lottery balance after bet
  //     let lotteryBalance
  //     lotteryBalance = await token.balanceOf(lottery.address)
  //     assert.equal(lotteryBalance.toString(), '60')
  //     // lotteryBalance = await web3.eth.getBalance(lottery.address)
  //     // assert.equal(lotteryBalance.toString(), '')
  //
  //     // Check logs to ensure event was emitted with correct data
  //     const event = result.logs[0].args
	// 		assert.equal(event._from, accounts[3])
	// 		assert.equal(event._destAddr, lottery.address)
  //     assert.equal(event._amount.toString(), '20')
  //
  //     // FAILURE: Investor can't bet more tokens than they have
	// 		await lottery.acceptToken('21', { from: accounts[3] }).should.be.rejected;
  //   })
  // })

  describe('pick winner from player pool', async () => {
    let result

    before( async () => {
      // Choose a winner from the players pool (these are the accounts that participate on the lottery)
      result = await lottery.pickWinner({from: deployer})
    })

    it('Allows owner to pick a winner from players pool', async () => {
      // Check Lottery balance after picking a winner
      let lotteryBalance
      lotteryBalance = await token.balanceOf(lottery.address)
      assert.equal(lotteryBalance.toString(), '0')

      // Check owner balance after picking a winner
      let ownerBalance
      ownerBalance = await token.balanceOf(accounts[0])
      assert.equal(ownerBalance.toString(), '6')

      // Check player balance after picking a winner
      let playerBalance
      playerBalance = await token.balanceOf(accounts[1])
      assert.equal(playerBalance.toString(), '14')
    })
  })
})
