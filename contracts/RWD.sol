// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RWD{
    string public name='Reward Token';
    string public symbol='RWD';
    uint256 public totalSupply=1000000000000000000000000;
    uint8 public decimanls=18;


       //  indexed allow us to filter through the address so we can searc for them. it costs gas
       // maximum u can use 3 indexed per event
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value

    );
    //  this is for security layer, incase users wants to cance;
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value

    );

   // An allowance is an amount of money given or allotted usually at regular intervals for a specific purpose. 
    mapping(address=>uint) public balanceOf;
    mapping(address=>mapping(address=>uint)) public allowance;


    constructor(){
        balanceOf[msg.sender]=totalSupply;

    }
    // rewards get sent
    function transfer(address _to, uint _value) public returns (bool success){
        require(balanceOf[msg.sender]>=_value);
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }
     //Allowance of another address to spend your tokens.
     // trasnferFrom, other wallet requests you money and you approve this transaction.
    function approve(address _spender, uint _value)public returns (bool success){
        allowance[msg.sender][_spender]=_value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    // transferFrom allows 3rd parties to run transactions, with the approval, these 3rd parties can do events such as pay for gas fees, make transfer and do transfers on behalf
    function trasferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(_value <=balanceOf[_from]);
        require(_value <=allowance[_from][msg.sender]);

        balanceOf[_to]+=_value;
        balanceOf[_from]-=_value;
        allowance[msg.sender][_from]-=_value;
        emit Transfer(_from,_to,_value);
        return true;


    }
}