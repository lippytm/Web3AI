// SPDX-License-Identifier: ISC
pragma solidity ^0.8.20;

/**
 * @title SimpleStorage
 * @dev A simple storage contract for sandbox testing and diagnostics
 */
contract SimpleStorage {
    uint256 private storedData;
    address public owner;
    
    event ValueChanged(uint256 oldValue, uint256 newValue, address changedBy);
    
    constructor() {
        owner = msg.sender;
        storedData = 0;
    }
    
    /**
     * @dev Store a new value
     * @param x The value to store
     */
    function set(uint256 x) public {
        uint256 oldValue = storedData;
        storedData = x;
        emit ValueChanged(oldValue, x, msg.sender);
    }
    
    /**
     * @dev Retrieve the stored value
     * @return The stored value
     */
    function get() public view returns (uint256) {
        return storedData;
    }
    
    /**
     * @dev Increment the stored value
     */
    function increment() public {
        uint256 oldValue = storedData;
        storedData += 1;
        emit ValueChanged(oldValue, storedData, msg.sender);
    }
    
    /**
     * @dev Decrement the stored value
     */
    function decrement() public {
        require(storedData > 0, "Cannot decrement below zero");
        uint256 oldValue = storedData;
        storedData -= 1;
        emit ValueChanged(oldValue, storedData, msg.sender);
    }
}
