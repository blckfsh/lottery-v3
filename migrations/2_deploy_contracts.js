const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed()

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0x7A8F7D9F6E9E9147916F259922EaF65144EF0B9D';
  const account_2 = '0x7A8F7D9F6E9E9147916F259922EaF65144EF0B9D';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '50000000000000000000')
  await token.transfer(account_2, '50000000000000000000')
}
