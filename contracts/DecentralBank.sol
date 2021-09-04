// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './RWD.sol';
import "./Tether.sol";

         
contract DecentralBank {
  string public name="Decentral Bank";
  address public owner;
  Tether public tether;
  RWD public rwd;

  
constructor (RWD _rwd,Tether _tether){
    rwd=_rwd;
    tether=_tether;
    owner=msg.sender;

}
address[] public stakers;
mapping(address=>uint) public stakingBalance;
// You can't loop through the keys or count the keys in a mapping. to keep tracking if this address is used for staking, we create another mapping
mapping(address=>bool) public hasStaked;
mapping(address=>bool) public isStaking;


//In order for this to work we need to have permission
// staking function. we are depositing out tokens into this contract
function depositTokens(uint _amount) public{
  require(_amount>0,'amount cannot be zero');
  // transfer tether to this contract address for staking
  // transferFrom means it is coming from third party
  // all erc20 tokens have trsnferFrom 
  tether.transferFrom(msg.sender,address(this), _amount);
  // Update the staking balance
  // Every key maps to something. If no value has been set yet, then the value is 0.
  stakingBalance[msg.sender]=stakingBalance[msg.sender]+_amount;
  if(!hasStaked[msg.sender]){
    stakers.push(msg.sender);
  }
  isStaking[msg.sender]=true;
  hasStaked[msg.sender]=true;
}

// Issue rewards
function issueTokens() public {
  require(msg.sender==owner,'caller must be owner');
  for(uint i=0;i<stakers.length;i++){
    address recipient=stakers[i];
    uint balance=stakingBalance[recipient]/9;
    if(balance>0){
           rwd.transfer(recipient, balance);
    }
 }

}

 

function unstakeTokens() public {
  uint balance=stakingBalance[msg.sender];
  require(balance>0,'Staking balance should be greater than 0');
  tether.transfer(msg.sender, balance);
  stakingBalance[msg.sender]=0;
  isStaking[msg.sender]=false;
}

}
