const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed();

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0x155EB1623879C1aFdcD6189f8DE97590143F1338';
  const account_2 = '0x4feEf2c7a9958b334348fA310B5Fe8C2EfC3d495';
  const account_3 = '0xD19ff444a0E4657Bf5E0BF268840780e5B12eFe6';
  const account_4 = '0x0E48b095cB9f11bBDF0aa73D1ee21885556E287D';
  const account_5 = '0x5f47B8E2D9B830616E9472ef926c28De1eC9cd51';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
