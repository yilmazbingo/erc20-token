Allowance means that we can grant approval to another contract or address to be able to transfer our ERC20 tokens. And this requirement is common in distributed applications, such as escrows, games, auctions, etc. Hence, we need a way to approve other address to spend our tokens. Also, another version of the transfer function requires the contract to check the allowance.

In the ERC20 standard, we have a global variable “allowed” in which we keep the mapping from an owners address to an approved spender’s address and then to the amount of tokens. Calling approve() function can add an approval to its desired \_spender and \_value. The amount of token is not checked here and it will be checked in transfer().

Once the approval is granted, approved spender can use transferFrom() to transfer tokens. \_from is the owner address and \_to is receiver’s address and \_value is the required number of tokens to be sent. First, we check if the owner actually possess the required number of tokens.
