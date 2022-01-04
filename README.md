SLP Lottery => wip
===========

Decentralized app lottery that accepts Smooth Love Token as a bet.

Packages used so far
--------------------

1. [babel-polyfill](https://www.npmjs.com/package/babel-polyfill)
2. [babel-register](https://www.npmjs.com/package/babel-register)
3. [bootstrap](https://www.npmjs.com/package/bootstrap)
4. [web3](https://www.npmjs.com/package/web3)
5. [chai](https://www.npmjs.com/package/chai)
6. [chai-as-promised](https://www.npmjs.com/package/chai-as-promised)
7. [chai-bignumber](https://www.npmjs.com/package/chai-bignumber)
8. [truffle](https://www.npmjs.com/package/truffle)

Smart Contract Functions
------------------------

1. ERC20 Token Standard Features - `totalSupply`, `balanceOf`, `allowance`, `transfer`, `approve`, `transferFrom`
2. Lottery Smart Contract - `acceptToken`, `getTokenBalanceOf`, `getBalance`, `pickWinner`, `resetLottery`

Test Script - Truffle
---------------------

Make sure you test blockchain environment is running. In this instance, I used `Ganache`. Then run the script...
```
truffle test
```

Deploying the smart contract - Truffle
--------------------------------------

To deploy the smart contracts on your test blockchain environment, type...
```
truffle migrate
```

Creator
-------
@blckfsh. All rights reserved.
