const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed();

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0x222A293AC04F3fD4F78214cC8E5cD4256D60a9e4';
  const account_2 = '0x9Ee24947645d6b36b7f72EE1959386c80508e593';
  const account_3 = '0x0523027F979E79A76031Ddb8b486889C5fa9aaE2';
  const account_4 = '0xFA0758F93ff78846f366475393257748a5C63294';
  const account_5 = '0xfAA7438B0FAF3f51c074A3becC035AA1B783a07c';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
