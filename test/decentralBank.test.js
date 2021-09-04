const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai").use(require("chai-as-promised")).should();

// run command truffle test
// mocha is already built in and looks for test directory.
// [owner,customer] is destructuring of accounts. accounts is passed by truffle
contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // Transfer all tokens to Decentral Bank. decentralBank is recepient
    await rwd.transfer(decentralBank.address, tokens("1000000"));
    // Transfer 100 mock tether to customer
    await tether.transfer(customer, tokens("100"), { from: owner });
  });
  describe("Mock Tether Deployment", async () => {
    it("Matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });
  describe("RWd Deployment", async () => {
    it("Matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank", async () => {
    it("Matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });
    it("contracts has token", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Yield farming", async () => {
    it("rewards token for staking", async () => {
      let result;
      // check investor balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor mock tether balance before staking"
      );
      // first ask for approval of 100 token transfer
      await tether.approve(decentralBank.address, tokens("100"), {
        from: customer,
      });
      // // check staking for customer
      await decentralBank.depositTokens(tokens("100"), { from: customer });
      // // check updated balance of customers. since they deposited 100, they got 0 left
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor mock tether balance after staking 100 tokens"
      );

      // Check updated balance of decentral bank
      result = await decentralBank.stakingBalance(owner);
      assert.equal(
        result.toString(),
        tokens("0"),
        "decentral bank  mock tether balance after staking from customer"
      );
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "true",
        "customer is staking status to be true after staking"
      );

      //Issue tokens
      await decentralBank.issueTokens({ from: owner });
      await decentralBank.issueTokens({ from: customer }).should.be.rejected;

      // Unstake Tokens
      await decentralBank.unstakeTokens({ from: customer });
      // Check unstaking balances
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock wallet balance after unstaking"
      );

      // Check Updated Balance of Decentral Bank
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "decentral bank mock wallet balance after staking from customer"
      );

      // Is Staking Update after unstaking
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "false",
        "customer is no longer staking "
      );
    });
  });
});
