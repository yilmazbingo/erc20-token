//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tether{
    string public name='Mock Tether Token';
    string public symbol='USDT';
    // uint256 public totalSupply=10000000000000000;
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimanls=18;


       //  indexed allow us to filter through the address so we can searc for them. it costs gas
       // maximum u can use 3 indexed per event
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value

    );
    //  only owner calls this. this is for security layer
    event Approval(
        address indexed _owner,
        address indexed _spender,
        
        uint _value

    );

    mapping(address=>uint) public balanceOf;
    mapping(address=>mapping(address=>uint)) public allowance;


    constructor(){
        balanceOf[msg.sender]=totalSupply;

    }

    function transfer(address _to, uint _value) public returns (bool success){
        require(balanceOf[msg.sender]>=_value);
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }

    function approve(address _spender, uint _value)public returns (bool success){
        allowance[msg.sender][_spender]=_value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    // transferFrom allows 3rd parties to run transactions, with the approval, these 3rd parties can do events such as pay for gas fees, make transfer and do transfers on behalf
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(_value <=balanceOf[_from]);
        require(_value <=allowance[_from][msg.sender]);

        balanceOf[_to]+=_value;
        balanceOf[_from]-=_value;
        allowance[_from][msg.sender]-=_value;
        emit Transfer(_from,_to,_value);
        return true;


    }
}
// contract Tether {
//     string  public name = "Mock Tether Token";
//     string  public symbol = "mUSDT";
//     uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
//     uint8   public decimals = 18;

//     event Transfer(
//         address indexed _from,
//         address indexed _to, 
//         uint _value
//     );

//     event Approval(
//         address indexed _owner,
//         address indexed _spender, 
//         uint _value
//     );

//     mapping(address => uint256) public balanceOf;
//     mapping(address => mapping(address => uint256)) public allowance;
    
//     constructor() {
//         balanceOf[msg.sender] = totalSupply;
//     }

//     function transfer(address _to, uint256 _value) public returns (bool success) {
//         // require that the value is greater or equal for transfer
//         require(balanceOf[msg.sender] >= _value);
//          // transfer the amount and subtract the balance
//         balanceOf[msg.sender] -= _value;
//         // add the balance
//         balanceOf[_to] += _value;
//         emit Transfer(msg.sender, _to, _value);
//         return true;
//     }

//     function approve(address _spender, uint256 _value) public returns (bool success) {
//         allowance[msg.sender][_spender] = _value;
//         emit Approval(msg.sender, _spender, _value);
//         return true;
//     }

//     function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
//         require(_value <= balanceOf[_from]);
//         require(_value <= allowance[_from][msg.sender]);
//         // add the balance for transferFrom
//         balanceOf[_to] += _value;
//         // subtract the balance for transferFrom
//         balanceOf[_from] -= _value;
//         allowance[msg.sender][_from] -= _value;
//         emit Transfer(_from, _to, _value);
//         return true;
//     }
// }
