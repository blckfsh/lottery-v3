const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed();

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0xe327D459E275974E72EA3aBA71962d1512D9A8CB';
  const account_2 = '0xc0347e9B560d37077613bC2FfAa5EDCcc45Bf4C6';
  const account_3 = '0x61F94a8b8D7909466f1D6d7cBF587b7BD1ad37f2';
  const account_4 = '0xc2365115A70fD106f86506210b99333A670C2dbB';
  const account_5 = '0x693Dc2cC6B5db97808fE0B8A81397344D8e0bd0e';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
