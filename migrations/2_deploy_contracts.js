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
  const account_2 = '0x53d18100D8BD04715bEEEF779183d8a371c69f90';
  const account_3 = '0xfC39b91736DEE1B6Bb17CbEbF713253697597Cb9';
  const account_4 = '0x88158fb54DA47bE10f2984F416000c38EC31494e';
  const account_5 = '0x8333D93efD6b2d4f1AC4260A7003c16056af9d36';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
