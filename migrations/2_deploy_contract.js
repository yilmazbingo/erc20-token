const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

// module.exports = async function (deployer, network, accounts) {
//   await deployer.deploy(Tether);
//   const tether = await Tether.deployed();

//   await deployer.deploy(RWD);
//   const rwd = await RWD.deployed();

//   await deployer.deploy(DecentralBank, RWD, Tether);
//   const decentralBank = await DecentralBank.deployed();

//   // transfer all rwd tokens to Decentral Bank
//   await rwd.transfer(decentralBank.address, "1000000000000000000000000");

//   //Distribute 100 tether to investors
//   //   We assume that second account from ganache is for the investors
//   await tether.transfer(accounts[1], "1000000000000000000");
// };

module.exports = async function (deployer, network, accounts) {
  // Deploy Mock Tether Token
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  // Deploy RWD Token
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  // Deploy DecentralBank
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  // Transfer all tokens to DecentralBank (1 million)
  await rwd.transfer(decentralBank.address, "1000000000000000000000000");
  try {
    // Transfer 100 Mock Tether tokens to investor
    await tether.transfer(accounts[1], "100000000000000000000");
  } catch (e) {
    console.log(e);
  }
};
