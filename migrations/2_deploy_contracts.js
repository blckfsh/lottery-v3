const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed()

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0x628FC7Bf5272EF96A648Ffd87a8000bd31511e6c';
  const account_2 = '0x22B3b603856FC532aaE127D2c3caD512CcAd563D';
  const account_3 = '0x7638e9D7AeB1e9e7a1477d2909D286920994587d';
  const account_4 = '0xa43d0fC18E129F4a69b803cdaACD3fBBBA1ce3d5';
  const account_5 = '0xbf647DB0fD2A18766b776e55F1B4ff98A861059B';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
