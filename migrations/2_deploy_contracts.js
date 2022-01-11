const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed()

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0x43778985b4a7aAaA8CF4C41F45505F13f88c15a6';
  const account_2 = '0x9B857Bd97902D6f4C5523aa51aC93b5c5C899cAA';
  const account_3 = '0x1178d87119Ed795041d18d67617680Fb1A8b14b7';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
}
