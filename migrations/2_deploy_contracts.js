const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed();

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0xcA7FA5E46e012388A8D9d85674e1cF36fc87C058';
  const account_2 = '0x58F3B5529c0A5B967961166840a3bF0A1aa8abe2';
  const account_3 = '0x5fFDd2726463EFB48Da2C2cdF7F8a2B79BEC213D';
  const account_4 = '0x71ebA6AEe66a601757f7a98fc0AB93B157707435';
  const account_5 = '0x9C1b29f2cafC58F906632d2ab492f9fc029DDE8F';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
