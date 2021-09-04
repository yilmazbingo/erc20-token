- Events are not the fucntions of the events. they are just events that we omit to the outside world to let our consumers know about what is going on
- events dont get stored in solidity. we cannot access it afterwards. the only people who can access it are the people outside.
- it is one way transmission and it has got lower gas costs.
- after you emit those events u cannot read them in the past.
- Smart contract can use event to return value to the user interface

- Applications can be notified when an event is emitted instead of constantly monitoring a contract on blockchain for state changes to occur. This is like subscribing a youtube channel.

“Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log —  a special data structure in the blockchain. These logs are associated with the address of the contract, are incorporated into the blockchain, and stay there as long as a block is accessible”
