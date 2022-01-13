const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100000000000000000000");
  const token = await SampleToken.deployed();

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);

  // Get Accounts
  const account_1 = '0xe7E8C6461aa892a684592Aa8CaE194D3920F41F4';
  const account_2 = '0xdD98b3b7B8DB56f5BDCB05466c0f72b62172bA85';
  const account_3 = '0xCb3D6044547f828B2167AfF5bEa0814103162D0C';
  const account_4 = '0x76959C6C7f898D4f05BB0Ed3D2A044624F132E03';
  const account_5 = '0x258A99F1442929e0A8ff825fFFd7E89d86a4e343';

  // Transfer tokens to accounts
  // await token.transfer(account_1, '50')
  await token.transfer(account_1, '20000000000000000000')
  await token.transfer(account_2, '20000000000000000000')
  await token.transfer(account_3, '20000000000000000000')
  await token.transfer(account_4, '20000000000000000000')
  await token.transfer(account_5, '20000000000000000000')
}
