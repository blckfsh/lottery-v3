const SampleToken = artifacts.require("SampleToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(SampleToken, "100");

  //Deploy Lottery
  await deployer.deploy(Lottery, SampleToken.address);
}
