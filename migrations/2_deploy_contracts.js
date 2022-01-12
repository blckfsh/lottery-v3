const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed();

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0x61d4D7f3bd606A5835b0f52e12bb90cfD1aaEDd1';
  const account_2 = '0xBaEC137FfCa314445C34F4Bb9CC4Aa50Be777376';
  const account_3 = '0x5BE55FC909fb90c1552776F017289ace4213f13A';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
}
