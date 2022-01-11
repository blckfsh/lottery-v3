const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed()

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0x213F4bed49A75e30efA5ABAB3cC73D9f6d9f268E';
  const account_2 = '0x78Bb17b36506ABB74407D6D143112736363989d7';
  const account_3 = '0xf4C1DA1b9677fF513CbB75c03e67Af96ec1f85b5';
  const account_4 = '0x93AD0640AeD5B548A5caD96d23E633c3E8655e6B';
  const account_5 = '0xd4a46b8D02367a3cbE1fa21b3cF03bc333d6ef43';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
