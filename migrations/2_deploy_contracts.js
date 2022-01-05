const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100");
  const token = await SampleToken.deployed()

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account = '0x8F6791c7B4E0052164cd35D4A87c06fe70561AA4';

  // Transfer tokens to accounts
  await token.transfer(account, '100')
}
