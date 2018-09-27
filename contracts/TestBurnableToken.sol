pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';

contract TestBurnableToken is StandardBurnableToken {
    string public name = "TestCoinBurnable";
    string public symbol = "tcb";
    uint8 public decimals = 18;

    uint256 public totalSupply;
    mapping (address => uint256) public balanceOf;

    constructor (
        uint256 initialSupply
    ) public {
        totalSupply = initialSupply * 10 ** uint256(decimals);  // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply;                // Give the creator all initial tokens
    }
}