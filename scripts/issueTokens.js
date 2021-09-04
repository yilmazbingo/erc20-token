const DecentralBank = artifacts.require("DecentralBank");

// we call this from the terminal
module.exports = async function issueRewards(callback) {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.issueTokens();
  console.log("Tokens have been issued successfully!");
  callback();
};
