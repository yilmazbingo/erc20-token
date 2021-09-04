- install hd-wallet-provider
  ` npm i @truffle/hdwallet-provider`
- signup on infura
  choose ropsten network. 
## Deploying to Local network
we need some ether in our account unlike test network. So we are feeding mnemonic-meta as source of ether. 

 we have to connect to a node in the ethereum network. we can run a local node in our local machine. We are going to be using Infura which is a public api

 @truffle/hdwallet-provider allows us to connect to infura api, but also allows us simultaneouly unlock an account. 
