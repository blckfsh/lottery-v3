const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed()

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0xa30c67480915Ba5aBB91F29CBAD52df9eAAFdc1A';
  const account_2 = '0x0eD4E0E99f6591D7E1A65382ff68627E51DD47ff';
  const account_3 = '0x65EBbA51bC3c92cc863D2B7aEE0D268627615B7b';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
}
