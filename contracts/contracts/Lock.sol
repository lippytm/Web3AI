// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Lock
 * @dev A simple time-locked contract that holds ETH until unlock time
 */
contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    /**
     * @dev Constructor sets the unlock time and owner
     * @param _unlockTime The timestamp when funds can be withdrawn
     */
    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    /**
     * @dev Withdraw all funds from the contract
     * Can only be called by owner after unlock time
     */
    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
