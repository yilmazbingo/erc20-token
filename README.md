## Warnings

- Intall chrome metamask plugin.
- Since I am deploying the code to Ropsten, make sure you use Ropsten network account in metamask.
- make sure Metamask is unlocked

## ERC20 smart contracts

- ERC20, which stands for ‘Ethereum Request for Comment’, is just one type of smart contract standard that exists within the Ethereum ecosystem, but it is by far the most recognizable.

ERC20 Smart Contracts are composed of six mandatory functions and two events. These first six functions are:

- balanceOf( )
- totalSupply( )
- transfer( )
- transferFrom( )
- approve( )
- allowance( )

**totalSupply()**
The ‘totalSupply()’ function pulls the entire circulating supply of the token that contract is tied to. Even though there may be a predetermined maximum set limit for the total supply, this function shows the current total supply in circulation, which may be less than its future total.

**balanceOf()**
The balance of your token is stored and retrieved through the ‘balanceOf( )’ function. This function requires a public Ethereum address to work properly, or else there is nowhere to pull a balance from.

**approve()**
This function is easier to think of as an authentication step for the owner of the contract. It approves the withdrawal of tokens from the owner’s address to the address that is attempting to retrieve tokens, up to a specified amount. This function works hand-in-hand with ‘allowance()’.

**transfer()**
This function is one many users are familiar with, as it allows the transfer of tokens from the contract owner’s address to another address.

**transferFrom()**
Well, think of it as an automatic transfer function. ‘transferFrom( )’ allows the smart contract to automatically send tokens from the owner’s address to another address, assuming the person has been approved to withdraw. It’s generally used by the contract itself, not by an actual person.

**allowance()**
This function checks the amount of tokens that the owner is allowing to be transferred by the smart contract from the owner’s address to another address. This function generally works hand-in-hand with the function ‘approve( )’, as it checks the amount of tokens that have been approved for transfer. Think of the value seen here as a limit cap on token withdrawals, so the supply can be properly managed.

The following events are triggered when relevant actions are executed:

• `Transfer(address indexed _from, address indexed_to, uint256 _value)`: Triggers when tokens are transferred

• `Approval(address indexed _owner, address indexed _spender, uint256 _value)`: Triggers whenever approve(address \_spender, uint256_value) is called

## ERC223

After enough time, problems with the ERC20 standard began to pop up. One problem in particular has caused a lot of heartaches and lost funds. If the ‘transfer( )’ function is used to send tokens directly to the main address of a smart contract, they are locked forever within the contract and can never be retrieved.

ERC223 is one out of many proposals to fix this issue, and it’s arguably the most popular. It is built with a newly defined ‘transfer( )’ function that allows tokens to be sent to either a personal address or a smart contract. It also includes a ‘tokenFallback( )’ function that checks the receiving contract for the same function. If the receiving contract does not have a ‘tokenFallback( )’ function, then the transaction will fail and all funds are returned to the address that sent them initially.

This new definition of ‘transfer( )’ eliminates the issue of lost tokens locked in contracts until the end of time, but sadly has no effect on all the previous ERC20 contracts that have already been written. It’s also worth mentioning that sending ERC223 tokens to a contract is a one-step process (rather than the two step approve-transfer process for ERC20 tokens). As such, it requires less gas costs to execute, making it very energy efficient!

## Gas

Gas is the fuel that powers an Ethereum network. In a public Ethereum blockchain network, to lure more and more miners to work on validating the transaction, the transaction creator assigns a particular amount of gas to the transaction, which has to be paid to the miner who mines the transaction the fastest.

The concept of gas was introduced so that Ethereum’s network could distinguish the computational costs from other expenses. By having a separate unit for this purpose, a practical distinction is created between the computational costs of the EVM and ETH’s actual valuation.

Many complex operations need more computation resource; that is to say, they need to pay more GAS. If a user wishes to have their transaction prioritized, he can submit transaction
with higher GAS price. This is because: GAS specified in transaction will be sent to miner and miner will sort all transaction in their local pool by GAS price. The transaction with
higher GAS price will have more chance than those with lower GAS price.In this way, transaction could be processed sooner by miner incentivized by higher transaction fee. As compensation for computation resource which miner invests in, GAS becomes more crucial after consensus migrates to Proof of Stake (POS). In POS era, miner no longer get rewarded by mining blocks and packing transactions, it is more important for miner to process transaction and get paid for expending resources on the blockchain.

**Gas limit:** This is the maximum amount of gas you are willing to pay to the miner for validating the transaction. The higher the price, the greater the chance that your transaction will be executed faster as that will attract more miners to prioritize your transaction over others. Also, insufficient gas in the gas limit will result in a failed transaction.

**Gas price:** This is the amount of ether or fraction of ether you are willing to spend on every unit of gas. The gas price is usually some amount of gwei, which is a fraction of a wei. Wei is the smallest unit of ether, and gwei is equivalent to 1000000000 wei.

**Gas cost:** This is a static value for a particular operation.

## Deploy multiple contracts

- migrations/1_initial_migration.js

```js
//-The name of an artifact is defined according to the contract's name, not the file's name.
const Migrations = artifacts.require("Migrations");
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(Tether);
  await deployer.deploy(RWD);
  await deployer.deploy(DecentralBank);
};
```

- run

```js
truffle migrate --reset
```

## Update the contracts

$ truffle migrate --reset

## Start the app

`npm run dev`

## Inteact with contracts after deployment

```js
$ truffle console
$ global=this // if you do not set this u get error
$ accounts=await web3.eth.getAccounts() // accounts that are listend in ganache network
$ accounts[0]
$ tether= await Tether.deployed()
$ tether // this will display contract object
$ tether.name // displays the function
$ tether.name() // dis[lays the name of the contract
$ balance=await tether.balanceOf(accounts[1])  // https://www.preciouschicken.com/blog/posts/decomposing-a-bignumber-in-truffle-console/
$ balance.toString()
$ convertBalance=await web3.utils.fromWei(balance) // 1 eth=10^18

```
