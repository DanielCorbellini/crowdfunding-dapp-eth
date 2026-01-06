// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import "./DataStructures.sol";

contract Campaign {
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;

    // modifier to check if caller is owner
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers.push(msg.sender);
    }

    function createRequest(
        string memory description,
        uint value,
        address recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });

        requests.push(newRequest);
    }
}
