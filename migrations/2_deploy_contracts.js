const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed();

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0x47c8d4A32D3CD70EFe04F072c9B7a5CA6f49c752';
  const account_2 = '0x623206d68BDfBc08B79005d2712917217ee0b17b';
  const account_3 = '0x181F68450aFe3AA429F4A2B52d539431Febc745F';
  const account_4 = '0xDDdD29c0de9c6E99045AC7d6e17585D5D5e99802';
  const account_5 = '0x339Aaac7267aA322b945F55bD4E8480e92B37357';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
