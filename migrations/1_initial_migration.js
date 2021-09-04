const Migrations = artifacts.require("Migrations");

// DecentralBank

module.exports = async function (deployer) {
  await deployer.deploy(Migrations);
};
